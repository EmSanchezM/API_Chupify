const { response } = require('express');
const bcrypt = require('bcryptjs');

//Modelos
const User = require('../models/user.model');
const Role = require('../models/role.model');
//Helpers
const { generarJWT } = require('../helpers/jwt');

const authController = {};

authController.registerUser = async(req, res=response)=>{
    //Recordatorio: Necesito el email para verificar si existe y el password para encriptarlo
    const {first_name, last_name, email, password, role} = req.body;
    try {
        const existeEmail = await User.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                message: 'El email ya esta registrado'
            });
        }

        const newUser = new User({
            first_name,
            last_name,
            email,
            password: await User.encryptPassword(password),
        });
        /*
        Si en el formulario viene el rol, buscamos en la BD y le asignamos
        sino le asignamos un rol por defecto.
        */ 
        if(role){
            const foundRoles = await Role.find({name: {$in: role}});
            newUser.role = foundRoles.map(role => role._id);
        }else{
            const role = await Role.findOne({name:'EMPRESA_ROLE'});
            newUser.role = [role._id];
        }

        await newUser.save();

        const token = await generarJWT(newUser.id)

        res.json({
            ok:true,
            newUser,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            message: 'Error inesperado..revisa logs'
        })
    }
}

authController.loginUser = async(req, res)=>{
    const userFound = await User.findOne({email: req.body.email}).populate('role');
    
    if(!userFound) return res.status(200).json({
        ok:false,
        message: 'Usuario no encontrado'
    });

    const passwordCoincide = await User.comparePassword(req.body.password, userFound.password);

    if(!passwordCoincide) return res.status(401).json({
        ok:false,
        message: 'Contraseña no válida',
        token: null
    });

    const token = await generarJWT(userFound._id)
    return res.status(200).json({
        ok: true,
        message: `Inicio de sesion, Bienvenido ${userFound.first_name} ${userFound.last_name}!`,
        userFound,
        token
    })
}

module.exports = authController;