import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { config } from "../utils/config.util.js";
import errorHandler from "../utils/errorHandler.util.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const userSignup = async (req, res, next) => {
  const { fname, lname, country, phone, about, email, password, profileimg } =
    req.body;
  if (!fname || !lname || !country || !phone || !about || !password || !email)
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
    email,
    password: hashedPassword,
    profileimg,
  });
  try {
    const savedUser = await newUser.save();
    if (savedUser) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.email,
          pass: config.password,
        },
      });

      const mailOptions = {
        from: config.email,
        to: newUser.email,
        subject: "Welcome to Whatsapp - Let's Chat & Connect!",
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome To Whatsapp</title>
        </head>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Arial, Helvetica, sans-serif;
            }
        
            ol li {
                font-size: 15px;
                margin-top: 5px;
            }
        </style>
        
        <body>
            <div
                style="width: 100%; background-color: rgba(2, 2, 2, 0.068); display: flex; align-items: center; justify-content: center;">
                <div style="width: 600px; margin-top: 30px;">
                    <div style="background-color: #51A985; padding: 20px;">
                        <h2 style="color: white; text-align: center;">Welcome To Whatsapp</h2>
                    </div>
                    <div style="background-color: white;">
                        <div style="padding: 20px;">
                            <h4>Welcome to whatsapp! 🎉 We are thrilled to have you join our community of chat enthusiasts and
                                connect with like-minded individuals from around the globe.</h4>
                            <p style="margin-top: 15px;">At Whatsapp, we believe in the power of conversation to bridge gaps,
                                foster understanding, and create meaningful connections. Whether you're here to meet new
                                friends, discuss shared interests, or seek support and advice, our platform is designed to be a
                                safe and inclusive space for all.</p>
                            <p style="margin-top: 15px;">Here are a few ways you can make the most out of your time on Whatsapp:
                            </p>
                            <ol style="margin-top: 15px; padding-left: 30px;">
                                <li>
                                    Explore and Discover: Dive into our diverse range of chat rooms and explore topics that
                                    pique your interest. From hobbies and passions to current events and discussions, there's
                                    something for everyone.
                                </li>
                                <li>
                                    Engage and Connect: Strike up conversations, share your thoughts, and connect with fellow
                                    members. Whether it's a casual chat or a deep discussion, every interaction has the
                                    potential to create meaningful connections.
                                </li>
                                <li>
                                    Respect and Empathy: Treat others with kindness, respect, and empathy. We value diversity
                                    and inclusivity, and we encourage you to embrace different perspectives and experiences.
                                </li>
                                <li>
                                    Stay Safe and Secure: Your privacy and safety are our top priorities. We have implemented
                                    robust measures to ensure a secure environment for all our users. If you ever encounter any
                                    issues or have concerns, don't hesitate to reach out to our support team.
                                </li>
                            </ol>
                            <p style="margin-top: 15px;">Once again, welcome to Whatsapp! We're honored to have you with us, and
                                we look forward to chatting, sharing, and connecting with you.</p>
                            <p style="margin-top: 15px;">If you have any questions, feedback, or just want to say hello, feel
                                free to reach out to us anytime.</p>
                            <p style="margin-top: 20px;">Warm regards,</p>
                        </div>
                        <div style="background-color: #51A985; padding: 20px; color: white;">
                            <h4>Hamza Ilyas</h4>
                            <p style="margin-top: 5px; font-size: 13px;">MERN Stack Developer</p>
                            <p style="margin-top: 5px; font-size: 13px;">Whatsapp</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        
        </html>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent:" + info.response);
          res.send({
            statusCode: 201,
            message: "User created successfully",
          });
        }
      });
    } else {
      res.send({
        statusCode: 400,
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
    res.cookie("access_token", token).status(201).json(rest);
  }
};

export const userLogOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User account has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You are not authorized to delete this user")
    );
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User account has been deleted successfully");
  } catch (error) {
    next(error);
  }
};
