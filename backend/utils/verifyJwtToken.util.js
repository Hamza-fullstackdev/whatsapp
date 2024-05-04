import jwt from "jsonwebtoken";
import errorHandler from "./errorHandler.util.js";
import { config } from "./config.util.js";

export const verifyJwtToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, config.jwtToken, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};
