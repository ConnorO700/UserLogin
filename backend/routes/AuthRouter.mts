import express from 'express';
import lc from '../controllers/UserController.mts';
const router = express.Router();

router.post('/create', lc.createUser);

router.post('/login', lc.loginUser);

router.post('/refresh', lc.refresh);

export default router;