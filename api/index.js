const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer")
const UserModel = require("./models/User.js");
const PlaceModel = require("./models/Place.js");

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
mongoose.connect(
  "mongodb+srv://itzbasatmaqsood:SLlu9tzyflvHckaO@booking-app.9aulubl.mongodb.net/?retryWrites=true&w=majority&appName=booking-app   "
);

const SecretKey = bcrypt.genSaltSync(8);
const jwtKey = "@basat1018!yeah@01-22-SE-01";

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
      res.status(422);
      res.json({
        errMessage:
          "Account Already exists on this Email. Please Try another Email Account.",
      });
    } else {
      res.status(500);
      res.json(err);
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });
  if (userDoc) {
    const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
    if (isPasswordCorrect) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, username: userDoc.username },
        jwtKey,
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(401);
      res.json({ errMessage: "Invalid Password" });
    }
  } else {
    res.status(500).json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtKey, (err, data) => {
      if (err) throw err;
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
  console.log(link);
  const name = "img" + Date.now() + ".jpg";
  imageDownloader
    .image({
      url: link,
      dest: __dirname + "/uploads/" + name,
    })
    .then(({ resp }) => {
      res.json(name);
    })
    .catch((err) => {
      res.status(500);
      res.json("Cannot upload image. Try another.");
    });
});

const photoMiddleWare = multer({
  dest: "uploads/",
});

app.post("/upload", photoMiddleWare.array("photos", 100), (req, res) => {
  console.log(1);
const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const part = originalname.split(".");
    const ext = part[part.length - 1];
    const newName = path + "." + ext ;
    fs.renameSync(path, newName);
    uploadedFiles.push(newName.split("\\")[newName.split("\\").length - 1]);
  }
  res.json(uploadedFiles);
});



app.post("/places", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtKey, (err, data) => {
      if (err) throw err;
      const newPlace = { ...req.body, owner: data.id };
      PlaceModel.create(newPlace).then((placeDoc) => {
        res.json(placeDoc);
      });
    });
  } else {
    res.status(500);
    res.json('Not Authenticated');
  }
});

app.get("/places", (req, res) => {

  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtKey, (err, data) => {
      if (err) throw err;
      const id = data.id; 
      PlaceModel.find({owner:id}).then((placeDoc) => {
        res.json(placeDoc);
      });
    });
  } else {
    res.status(500);
    res.json('Not Authenticated');
  }

});
app.listen(4000);
