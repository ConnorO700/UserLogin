import express from 'express';
import lc from '../controllers/UserController.mts';
import jwtMiddleware from '../middleware/JwtValidator.ts';

const router = express.Router();

router.get('/single/:id',  jwtMiddleware, lc.getUserById);

router.post('/email', lc.emailIsUsed);

router.get('/all', jwtMiddleware, lc.getAllUsers);

router.put('/', jwtMiddleware, lc.editUser);

router.delete('/single/:id', jwtMiddleware, lc.deleteUser);


export default router;