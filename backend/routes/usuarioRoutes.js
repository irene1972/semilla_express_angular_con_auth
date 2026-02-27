import express from 'express';
import {
    getUsers,
    crearUsuario,
    loginUser,
    confirmar
} from '../controllers/usuarioController.js';

const router=express.Router();

//router.get('/',envioEmail);
router.get('/listar',getUsers);
router.post('/registrar',crearUsuario);
router.post('/login',loginUser);
router.put('/confirmar',confirmar);

export default router;