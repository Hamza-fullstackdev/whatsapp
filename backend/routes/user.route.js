import express from 'express';
import { getAllUsers, getSingleUser, updateUser } from '../controllers/user.controller.js';
import { verifyJwtToken } from '../utils/verifyJwtToken.util.js';

const router = express.Router();

router.get('/all-users',verifyJwtToken, getAllUsers);
router.get('/single-user/:id',verifyJwtToken, getSingleUser);
router.post('/update-user/:id',verifyJwtToken, updateUser);

export default router;