const { response } = require('express');

//Modelos
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Empresa = require('../models/empresa.model')
//Helpers
const { generarJWT } = require('../helpers/jwt');

const empresaController = {};

//Obtener todos las empresa
empresaController.getEmpresas = async(req, res)=>{
    const empresas = await Empresa.find().populate('user');
    return res.json(empresas);
}

empresaController.createEmpresa = async(req, res=response)=>{

    const {first_name, last_name, email, password, role, name, rubro, tienda} = req.body;
    
    try {
        const existeEmail = await User.findOne({email});
        const existeTienda = await Empresa.findOne({tienda});

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                message: 'El email ya esta registrado'
            });
        }

        if(existeTienda){
            return res.status(400).json({
                ok:false,
                message: 'El nombre de la tienda ya existe'
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

        const userID = newUser.id
        console.log(userID);

        const empresaNew = new Empresa({
            usuario: userID,
            name,
            rubro,
            tienda
        });

        await empresaNew.save();

        //const token = await generarJWT(newUser.id)

        res.json({
            ok:true,
            empresaNew
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            message: 'Error inesperado..revisa logs'
        })
    }

}

module.exports = empresaController;