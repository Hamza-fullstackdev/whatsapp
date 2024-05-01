import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { config } from "../utils/config.util.js";
import errorHandler from "../utils/errorHandler.util.js";
import bcrypt from "bcryptjs";

export const userSignup = async (req, res, next) => {
  const { fname, lname, country, phone, about, password, profileimg } =
    req.body;
  if (!fname || !lname || !country || !phone || !about || !password)
    return next(errorHandler(400, "All fields are required"));
  if (password.length < 8)
    return next(errorHandler(400, "Password must be at least 8 characters"));
  function containsOnlyNumbers(phoneNumber) {
    const numberPattern = /^\d+$/;
    return numberPattern.test(phoneNumber);
  }
  if (!containsOnlyNumbers(phone))
    return next(errorHandler(400, "Invalid phone number"));
  const checkNumber = await User.findOne({ phone });
  if (checkNumber) {
    return next(errorHandler(400, "Phone number already exists"));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    fname,
    lname,
    country,
    phone,
    about,
    password: hashedPassword,
    profileimg,
  });
  try {
    const savedUser = await newUser.save();
    if (savedUser) {
      res.send({
        status: 201,
        message: "User created successfully",
      });
    } else {
      res.send({
        status: 400,
        message: "User creation failed",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  const { phone, password } = req.body;
  if (!phone || !password)
    return next(errorHandler(400, "All fields are required"));
  function containsOnlyNumbers(phoneNumber) {
    const numberPattern = /^\d+$/;
    return numberPattern.test(phoneNumber);
  }
  if (!containsOnlyNumbers(phone))
    return next(errorHandler(400, "Invalid phone number"));
  const user = await User.findOne({ phone });
  if (!user) {
    return next(errorHandler(400, "User does not exist"));
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(errorHandler(400, "Invalid credentials"));
  }
  if (user) {
    const token = jwt.sign({ id: user._id }, config.jwtToken);
    const { password: pass, ...rest } = user._doc;
    res.cookie("access_token", token).status(200).json(rest);
  }
};
