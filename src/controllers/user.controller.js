const { response } = require('express');

const userController = {};

const User = require('../models/user.model');
const Role = require('../models/role.model');

const { generarJWT } = require('../helpers/jwt');

userController.getUsers = async(req, res)=>{
    const users = await User.find();
    return res.json(users);
}

userController.getUserById = async(req, res)=>{
    const user = await User.findById(req.params.user_id)
    return res.status(200).json(user);
}

userController.createUser = async(req, res=response)=>{
    //Necesito el email para verificar si existe y el password para encriptarlo
    const {email, password, roles} = req.body;
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
            password: await encryptPassword(password),
        });


        if(roles){
            const foundRoles = await Role.find({name: {$in: roles}});
            newUser.role = foundRoles.map(role=> role._id);
        }else{
            const role = await Role.findOne({name:'USER_ROLE'});
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

module.exports = userController;
