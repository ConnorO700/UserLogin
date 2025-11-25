import express from 'express';
import lc from '../controllers/userController.ts';
const router = express.Router();

router.post('/create', lc.createUser);

router.post('/login', lc.loginUser);

export default router;