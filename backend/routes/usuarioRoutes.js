import express from 'express';
import {
    getUsers,
    crearUsuario
} from '../controllers/usuarioController.js';

const router=express.Router();

//router.get('/',envioEmail);
router.get('/listar',getUsers);
router.post('/registrar',crearUsuario);

export default router;