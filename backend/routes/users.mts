import express from 'express';
import lc from '../controllers/userController.mts';
import jwtMiddleware from '../middleware/validate.ts';

const router = express.Router();

router.get("/", jwtMiddleware, lc.getAll);

router.get('/:id', jwtMiddleware, lc.getUser);

router.put('/', jwtMiddleware, lc.editUser);

router.delete('/', jwtMiddleware, lc.deleteUser);


export default router;