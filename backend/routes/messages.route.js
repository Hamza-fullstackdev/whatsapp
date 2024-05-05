import express from "express";
import {verifyJwtToken} from "../utils/verifyJwtToken.util.js";
import { sendMessage } from "../controllers/messages.controller.js";
const router = express.Router();

router.post("/send/:id", verifyJwtToken, sendMessage);

export default router;
