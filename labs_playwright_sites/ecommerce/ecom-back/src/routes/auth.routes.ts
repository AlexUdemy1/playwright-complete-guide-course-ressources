import express from 'express';
import { login, logout, verifyToken } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', verifyToken); // get current user from token

export default router;
