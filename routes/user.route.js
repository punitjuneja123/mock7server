const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

const { userModel } = require("../models/user.model");

userRouter.post("/api/register", async (req, res) => {
  let payload = req.body;
  let checkMail = await userModel.find({ email: payload.email });
  if (checkMail.length == 0) {
    bcrypt.hash(payload.password, +process.env.salt, async (err, result) => {
      if (err) {
        res.status(400);
        res.send("something went wrong");
      } else {
        payload.password = result;
        let registerUser = await new userModel(payload);
        registerUser.save();
        res.status(201);
        res.send("user registered");
      }
    });
  } else {
    res.status(400);
    res.send("user already exists");
  }
});

userRouter.post("/api/login", async (req, res) => {
  payload = req.body;
  let userData = await userModel.find({ email: payload.email });
  if (userData.length > 0) {
    bcrypt.compare(payload.password, userData[0].password, (err, result) => {
      if (result) {
        let token = jwt.sign({ userID: userData[0]._id }, process.env.secret);
        res.status(201);
        res.send({ msg: "login successful", token: token });
      } else {
        console.log(err);
        res.status(400);
        res.send("wrong credentials");
      }
    });
  } else {
    res.status(400);
    res.send("wrong credentials");
  }
});

userRouter.patch("/api/user/:id/reset", async (req, res) => {
  let userID = req.params.id;
  let payload = req.body;
  let userData = await userModel.find({ _id: userID });
  if (userData.length > 0) {
    //   comparing the current password
    bcrypt.compare(
      payload.currentPassword,
      userData[0].password,
      (err, result) => {
        if (result) {
          // setting new password
          bcrypt.hash(
            payload.newPassword,
            +process.env.salt,
            async (err, result) => {
              if (err) {
                res.status(400);
                res.send("something went wrong");
              } else {
                await userModel.findByIdAndUpdate(
                  { _id: userID },
                  { password: result }
                );
                // res.status(204);
                res.send("password updated/reset");
              }
            }
          );
        } else {
          res.status(400);
          res.send("current password didn't match");
        }
      }
    );
  } else {
    res.status(400);
    res.send("please check the ID you provided");
  }
});

module.exports = { userRouter };

// {
//   "name": "punit",
//   "email": "punit@mail.com",
//   "password": "12345",
//   "address": {
//     "street": "1",
//     "city": "ukt",
//     "state": "odisha",
//     "country": "India",
//     "zip": "764073"
//   }
// }

// {
//   "currentPassword":"1234",
//   "newPassword":"12345"
// }
