const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const auth = require("../utils/verify-token");

router.get("/", auth, async (req, res, next) => {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (error) {
    return next(new Error(error));
  }
});

// user Register

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (user) {
      res.status(400);
      return next(new Error("Email already exists"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400);
    return next(new Error(err));
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      res.status(400);
      return next(new Error("Email not found!"));
    }

    const isMatch = bcrypt.compareSync(req.body.password, user.password);

    if (!isMatch) {
      res.status(400);
      return next(new Error("Invalid password"));
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.Token);

    res.status(200).json({ token });
  } catch (error) {
    return next(new Error(error));
  }
});
module.exports = router;
