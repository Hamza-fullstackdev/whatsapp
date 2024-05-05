import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.util.js";
export const getAllUsers = async (req, res, next) => {
  if (req.user.id) {
    try {
      const users = await User.find();
      if (!users) return next(errorHandler(400, "User not found"));
      res.status(200).json({
        success: true,
        users: users,
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(
      errorHandler(400, "you are not authorized to access this page")
    );
  }
};

export const getSingleUser = async (req, res, next) => {
  if (req.user.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return next(errorHandler(400, "User not found"));
      const { password, ...rest } = user._doc;
      res.status(200).json({
        success: true,
        user: rest,
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(
      errorHandler(400, "you are not authorized to access this page")
    );
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(403, "You are not authorized to update this user")
    );
  }
  if (req.body.password) {
    if (req.body.password < 8) {
      return next(errorHandler(403, "Password should be atleast 8 characters"));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          fname: req.body.fname,
          lname: req.body.lname,
          phone: req.body.phone,
          profileimg: req.body.profileimg,
        },
      },
      { new: true }
    );
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const searchUsers = async (req, res, next) => {
  if (req.user.id) {
    const { query } = req.query;

    try {
      const users = await User.find({
        $or: [
          { fname: { $regex: query, $options: "i" } },
          { lname: { $regex: query, $options: "i" } },
          { phone: { $regex: query, $options: "i" } },
        ],
      });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
};
