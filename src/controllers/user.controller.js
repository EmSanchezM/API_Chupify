const { response } = require('express');

//Modelos
const User = require('../models/user.model');
const Role = require('../models/role.model');
//Helpers
const { generarJWT } = require('../helpers/jwt');

const userController = {};

//Obtener todos los usuarios
userController.getUsers = async(req, res)=>{
    const users = await User.find().populate('role');
    return res.json(users);
}

//Obtener usuario por ID: user_id
userController.getUserById = async(req, res)=>{
    const user = await User.findById(req.params.user_id).populate('role')
    return res.status(200).json(user);
}

//Obtener usuario por email
userController.getUserByEmail = async(req, res)=>{
    const regex = new RegExp(req.params.email, 'i')
    const user = await User.findOne({email: {$eq: regex}}, (error, response)=>{
        if(error) res.send(error);
    })
    return res.status(200).json(user);
}

//Crear un usuario
userController.createUser = async(req, res=response)=>{
    //Necesito el email para verificar si existe y el password para encriptarlo
    const {first_name, last_name, email, password, role } = req.body;

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

//Actualizar un usuario
userController.updateUser = async(req, res)=>{
    const id = req.params.user_id;
    try {
        const userUpdate = await User.findById(id);

        if(!userUpdate){
            return res.status(404).json({
                ok:false,
                message: 'No existe usuario con ese ID'
            });
        }
        
        const {first_name, last_name, email, password, role} = req.body;
        
        if(userUpdate.email !== email){
            const existeEmail = await User.findOne({email});
            console.log('existe ',existeEmail)
            if(existeEmail){
                return res.status(400).json({
                    ok:true,
                    message: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        // MODIFICAMOS EL ROL DE USUARIO 
        const roleID = await Role.findOne({role});
        const campos = {first_name, last_name, email, password, roleID};
        
        const userUpdated = await User.findByIdAndUpdate(id, campos, {new:true});

        res.status(200).json({
            ok:true,
            message: 'Usuario actualizado',
            user: userUpdated
        });

    } catch (error) {
        console.error('ERROR ',error);
        
        res.status(500).json({
            ok:false,
            message: 'Error inesperado..revisa logs'
        })
    }
}

userController.deleteUser = async(req, res)=>{
    const id = req.params.user_id;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                ok:false,
                message: 'No existe un usuario con ese ID'
            });
        }

        await User.findByIdAndDelete(id);

        res.json({
            ok:true,
            message: 'Usuario eliminado'
        });
    } catch (error) {
        console.error('ERROR ', error);
        res.status(500).json({
            ok:false,
            message: 'No se eliminado.. Error inesperado, revisa logs'
        })        
    }
}

module.exports = userController;
