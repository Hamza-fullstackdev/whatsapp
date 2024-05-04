import express from 'express';
import { getAllUsers, getSingleUser } from '../controllers/user.controller.js';
import { verifyJwtToken } from '../utils/verifyJwtToken.util.js';

const router = express.Router();

router.get('/all-users',verifyJwtToken, getAllUsers);
router.get('/single-user/:id',verifyJwtToken, getSingleUser);

export default router;