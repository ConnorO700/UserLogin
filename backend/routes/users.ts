import express from 'express';
import lc from '../controllers/loginController.ts';
const router = express.Router();

router.post('/create', lc.createUser );

router.post('/login', lc.loginUser );

router.get('/:id', lc.getUser );

router.put('/', lc.editUser);

router.delete('/', lc.deleteUser);


export default router;