const express = require("express");
const user = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// create token with user id
const createToken = (_id) => {
  // expiresIn is set to 1 day
  // JWT_SECRET is a secret string that is used to sign the token
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// controller function to register users
const registerUser  = async (req, res) => {
  const body = req.body;

  try {
    const exists = await user.findOne({ email: body.email });

    if (!body.name || !body.email || !body.password) {
      throw new Error("Please fill all the fields");
    }

    if (!validator.isEmail(body.email)) {
      throw new Error("Email is not valid");
    }

    if (!validator.isStrongPassword(body.password)) {
      throw new Error("Password is not strong enough");
    }

    if (exists) {
      throw new Error("Email already exists");
    }

    // generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser  = new user({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    const newentry = await newUser .save();
    const token = createToken(newentry._id.toString());

    res.status(201).json({
      name: newentry.name,
      email: newentry.email,
      token: token,
    });
  } catch (error) {
    // Check if it's a validation error
    if (error instanceof Error) {
      res.status(400).json({
        status: "400 Bad Request",
        message: error.message,
      });
    } else {
      // Handle internal server errors
      console.error("Internal Server Error:", error);

      res.status(500).json({
        status: "500 Internal Server Error",
        message: "500 Internal Server Error, User not created",
      });
    }
  }
};

module.exports = { registerUser  };