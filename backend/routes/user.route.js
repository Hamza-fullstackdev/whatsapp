import express from 'express';
import { getAllUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/all-users', getAllUsers);

export default router;