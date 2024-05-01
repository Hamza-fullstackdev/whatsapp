import express from 'express';
import { userSignup } from '../controllers/auth.controller.js';
import { userLogs } from '../utils/userlogs.utils.js';

const router= express.Router();

router.post('/signup',userLogs,userSignup);

export default router;