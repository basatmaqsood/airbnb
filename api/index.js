const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User.js");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://127.0.0.1" }));
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
    }else{
        res.status(500);
        res.json(err);
    }
  }
});

app.listen(4000);
