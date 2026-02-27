import email from '../helpers/email.js';
import pool from '../config/db.js';
import { User } from '../models/User.js';

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

const createUser = async (req, res) => {
    
        const {nombre,apellidos,email,password}=req.body;
        
        if(!nombre | !apellidos | !email | !password){
            return res.status(400).json({error:'Todos los campos son obligatorios'});
        }
    
        try {
            const usuario=new User(nombre,apellidos,email,password);
            const resultado=await usuario.insert();
            if(resultado[0].affectedRows===1){
                res.json({mensaje:'Datos insertados correctamente'});
            }else{
                return res.status(500).json({error:'Ha habido un error al insertar los datos en la bd'});
            }
        } catch (error) {
            return res.status(500).json({error:'Ha habido un error al insertar los datos'});
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

export {
    envioEmail,
    createUser,
    getUsers
}