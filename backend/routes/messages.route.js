import express from "express";
import {verifyJwtToken} from "../utils/verifyJwtToken.util.js";
import { getMessages, sendMessage } from "../controllers/messages.controller.js";
const router = express.Router();

router.post("/send/:id", verifyJwtToken, sendMessage);
router.get("/get/:id", verifyJwtToken,getMessages);

export default router;
