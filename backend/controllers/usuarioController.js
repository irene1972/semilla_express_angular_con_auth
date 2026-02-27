import email from '../helpers/email.js';
import { User } from '../models/User.js';
import enviarEmail from '../helpers/email.js';
import { encriptarPassword, matchPassword } from '../helpers/password.js';
import { crearToken, decodificarToken } from '../helpers/token.js';

const getUsers = async (req, res) => {
    try {
        const usuario = new User();
        const resultado = await usuario.getAll();
        //const resultado=await pool.query('SELECT * FROM usuarios');
        if (resultado[0]) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }

}

const envioEmail = async (req, res) => {
    //res.json('Funciona!');

    try {
        //envio del email
        email({
            email: 'ireneog_72@hotmail.es',
            nombre: 'Irene Olmos'
        });

        res.json({ mensaje: `El email se ha enviado correctamente` });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Ha habido un error' });
    }
}

const crearUsuario = async (req, res) => {
    const { nombre, email, password, confirmPassword, apellido, nick } = req.body;
    if (!nombre || !email || !password || !confirmPassword || !apellido || !nick) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Los password deben ser iguales' });
    }
    //todo: hashear el password antes de insertarlo
    const hashedPassword = await encriptarPassword(password);
    const token = crearToken(email);
    try {
        const usuario = new User(nombre, email, hashedPassword, token, apellido, nick);
        const resultado = await usuario.insert();
        if (resultado) {
            try {
                //envio del email
                enviarEmail({
                    email,
                    nombre,
                    token
                });

                res.json({
                    mensaje: `El usuario ha sido registrado correctamente`,
                    usuario: email
                });


            } catch (error) {
                console.log(error);
                return res.status(400).json({ error: 'Ha habido un error al enviarse el email' });
            }

        } else {
            return res.status(500).json({ error: 'Ha habido un error al insertarse los datos en la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al insertarse los datos' });
    }
}

const confirmar = async (req, res) => {

    const { token } = req.body;

    try {

        const decodedToken = await decodificarToken(token, process.env.JWT_SECRET);

        if (decodedToken === 'error') {
            return res.status(500).json({ error: 'Token no válido' });
        }

        if (decodedToken.user) {
            const email = decodedToken.user;

            const usuario = new User();
            const resultado = await usuario.confirm(email);

            if (resultado[0].affectedRows === 1) {
                res.json({ mensaje: 'Usuario confirmado con éxito' });
            } else {
                return res.status(500).json({ error: 'Ha habido un error al confirmar' });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al confirmar' });
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Los dos campos son obligatorios' });
    }

    try {
        const usuario = new User();

        const resultado = await usuario.getByEmail(email);

        if (resultado[0].length === 0) {
            return res.status(500).json({ error: 'El usuario no está registrado' });
        }
        const usuarioEncontrado = resultado[0][0];

        const matched = await matchPassword(password, usuarioEncontrado.password);

        if (matched && usuarioEncontrado.confirmado === 1) {
            //res.json({ mensaje: 'Usuario logueado correctamente' });
            res.json(usuarioEncontrado);
        } else {
            return res.status(400).json({ error: 'El usuario o el password son incorrectos, o el usuario no ha confirmado su cuenta' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
}

export {
    getUsers,
    envioEmail,
    crearUsuario,
    confirmar,
    loginUser
}