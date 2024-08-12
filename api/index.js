const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const UserModel = require("./models/User.js");
const PlaceModel = require("./models/Place.js");
const BookingModel = require("./models/Booking.js");

const app = express();
app.use(cors({ credentials: true, origin: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// Use environment variables for sensitive data
mongoose.connect(process.env.MONGODB_URI);

const SecretKey = bcrypt.genSaltSync(8);
const jwtKey = process.env.JWT_KEY;

app.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userDoc = await UserModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, SecretKey),
    });
    res.json(userDoc);
  } catch (err) {
    if (err.code === 11000) {
      res.status(422).json({
        errMessage: "Account Already exists on this Email. Please Try another Email Account.",
      });
    } else {
      res.status(500).json(err);
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return res.status(404).json({ errMessage: "User not found" });

    const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordCorrect) return res.status(401).json({ errMessage: "Invalid Password" });

    jwt.sign({ email: userDoc.email, id: userDoc._id, username: userDoc.username }, jwtKey, (err, token) => {
      if (err) return res.status(500).json({ errMessage: "Failed to generate token" });
      res.cookie("token", token).json(userDoc);
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtKey, (err, data) => {
      if (err) return res.status(500).json({ error: "Failed to verify token" });
      res.json(data);
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", (req, res) => {
  const { link } = req.body;
  const name = "img" + Date.now() + ".jpg";
  imageDownloader
    .image({
      url: link,
      dest: "/tmp/" + name,
    })
    .then(({ resp }) => {
      res.json(name);
    })
    .catch((err) => {
      res.status(500).json("Cannot upload image. Try another.");
    });
});

const photoMiddleware = multer({ dest: "/tmp/uploads/" });

app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const part = originalname.split(".");
    const ext = part[part.length - 1];
    const newName = path + "." + ext;
    fs.renameSync(path, newName);
    uploadedFiles.push(newName.split("/").pop());
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtKey, (err, data) => {
      if (err) return res.status(500).json({ error: "Failed to verify token" });
      const newPlace = { ...req.body, owner: data.id };
      PlaceModel.create(newPlace)
        .then((placeDoc) => res.json(placeDoc))
        .catch((err) => res.status(500).json(err));
    });
  } else {
    res.status(401).json("Not Authenticated");
  }
});

app.get("/userPlaces", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtKey, (err, data) => {
      if (err) return res.status(500).json({ error: "Failed to verify token" });
      PlaceModel.find({ owner: data.id })
        .then((placeDoc) => res.json(placeDoc))
        .catch((err) => res.status(500).json(err));
    });
  } else {
    res.status(401).json("Not Authenticated");
  }
});

app.get("/places", (req, res) => {
  PlaceModel.find()
    .then((placeDoc) => res.json(placeDoc))
    .catch((err) => res.status(500).json(err));
});

app.get("/places/:id", (req, res) => {
  const { id } = req.params;
  PlaceModel.findById(id)
    .then((placeDoc) => res.json(placeDoc))
    .catch((err) => res.status(500).json(err));
});

app.put("/places/:id", (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;

  if (token) {
    jwt.verify(token, jwtKey, async (err, data) => {
      if (err) return res.status(500).json({ error: "Failed to verify token" });
      const placeDoc = await PlaceModel.findById(id);
      if (placeDoc.owner.toString() === data.id) {
        placeDoc.set(req.body);
        placeDoc.save().then(() => res.json("ok"));
      } else {
        res.status(403).json("Not Authorized");
      }
    });
  } else {
    res.status(401).json("Not Authenticated");
  }
});

app.post("/book", (req, res) => {
  const { token } = req.cookies;
  const newBooking = req.body;
  if (token) {
    jwt.verify(token, jwtKey, (err, data) => {
      if (err) return res.status(500).json({ error: "Failed to verify token" });
      BookingModel.create(newBooking)
        .then((bookingDoc) => res.json(bookingDoc))
        .catch((err) => res.status(500).json(err));
    });
  } else {
    res.status(401).json("Not Authenticated");
  }
});

app.get("/bookings", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtKey, (err, data) => {
      if (err) return res.status(500).json({ error: "Failed to verify token" });
      BookingModel.find({ booker: data.id })
        .populate("place")
        .then((bookingDoc) => res.json(bookingDoc))
        .catch((err) => res.status(500).json(err));
    });
  } else {
    res.status(401).json("Not Authenticated");
  }
});

// Export the app for Vercel
module.exports = app;
