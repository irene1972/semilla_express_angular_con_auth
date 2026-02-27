import express from 'express';
import {
    getUsers,
    crearUsuario,
    confirmar
} from '../controllers/usuarioController.js';

const router=express.Router();

//router.get('/',envioEmail);
router.get('/listar',getUsers);
router.post('/registrar',crearUsuario);
router.put('/confirmar',confirmar);

export default router;