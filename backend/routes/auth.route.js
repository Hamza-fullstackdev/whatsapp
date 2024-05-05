import express from "express";
import {
  userSignup,
  userLogin,
  userLogOut,
  deleteUser,
} from "../controllers/auth.controller.js";
import { userLogs } from "../utils/userlogs.utils.js";
import { verifyJwtToken } from "../utils/verifyJwtToken.util.js";

const router = express.Router();

router.post("/signup", userLogs, userSignup);
router.post("/login", userLogin);
router.post("/logout", verifyJwtToken, userLogOut);
router.delete("/delete/:id", verifyJwtToken, deleteUser);
export default router;
