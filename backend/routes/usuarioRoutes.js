import express from 'express';
import {
    envioEmail,
    getUsers,
    createUser
} from '../controllers/usuarioController.js';

const router=express.Router();

//router.get('/',envioEmail);
router.get('/listar',getUsers);
router.post('/crear',createUser);

export default router;