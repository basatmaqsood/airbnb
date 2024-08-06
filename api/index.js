const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
mongoose.connect(
  "mongodb+srv://itzbasatmaqsood:SLlu9tzyflvHckaO@booking-app.9aulubl.mongodb.net/?retryWrites=true&w=majority&appName=booking-app   "
);

const SecretKey = bcrypt.genSaltSync(8);

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
      jwt.sign({email:userDoc.email, id:userDoc._id},SecretKey,(err,token)=>{
        if(err) throw err;
        res.cookie('token',token).json(userDoc);
      })
    } else {
      res.status(401);
      res.json({ errMessage: "Invalid Password" });
    }
  } else {
    res.status(500).json("not found");
  }
});

app.listen(4000);
