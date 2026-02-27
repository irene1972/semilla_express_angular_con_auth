import email from '../helpers/email.js';
import { User } from '../models/User.js';
import enviarEmail from '../helpers/email.js';
import { encriptarPassword } from '../helpers/password.js';
import { crearToken } from '../helpers/token.js';

const getUsers=async(req,res)=>{
    try {
        const usuario=new User();
        const resultado=await usuario.getAll();
        //const resultado=await pool.query('SELECT * FROM usuarios');
        if(resultado[0]){
            res.json(resultado[0]);
        }else{
            return res.status(500).json({error:'Ha habido un error al consultar la base de datos'});
        }
    } catch (error) {
        return res.status(500).json({error:'Ha habido un error al consultar los datos'});
    }
    
}

const envioEmail=async (req, res) => {
    //res.json('Funciona!');

    try {
        //envio del email
        email({
            email:'ireneog_72@hotmail.es',
            nombre: 'Irene Olmos'
        });

        res.json({mensaje:`El email se ha enviado correctamente`});

    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Ha habido un error'});
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

export {
    getUsers,
    envioEmail,
    crearUsuario
    
}