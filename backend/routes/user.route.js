import express from 'express';
import { getAllUsers } from '../controllers/user.controller.js';
import { verifyJwtToken } from '../utils/verifyJwtToken.util.js';

const router = express.Router();

router.get('/all-users',verifyJwtToken, getAllUsers);

export default router;