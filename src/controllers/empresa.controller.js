const { response } = require('express');

//Modelos
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Empresa = require('../models/empresa.model');
const PlanPago = require('../models/planesPago.model');
//Helpers
const { generarJWT } = require('../helpers/jwt');

const empresaController = {};

//Obtener todos las empresas
empresaController.getEmpresas = async(req, res)=>{
    const empresas = await Empresa.find()
                                  .populate('usuario')
                                  .populate('role')
                                  .populate('plan_pago');
    return res.json(empresas);
}

//Obtener empresa por ID: empresa_id
empresaController.getEmpresaById = async(req, res)=>{
    try {
        const empresa = await Empresa.findById(req.params.empresa_id)
                                     .populate('usuario')
                                     .populate('role')
                                     .populate('plan_pago')
                                     
        return res.status(200).json(empresa);
    } catch (error) {
        console.error(error)
    }
}

empresaController.createEmpresa = async(req, res=response)=>{

    const {first_name, last_name, email, password, role, name, rubro, tienda, pago} = req.body;
    
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
            password: await User.encryptPassword(password)
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
        
        const empresaNew = new Empresa({
            usuario: userID,
            name,
            rubro,
            tienda
        });

        /*
        Si en el formulario viene el plan de pago, buscamos en la BD y le asignamos
        sino le asignamos un plan gratis por defecto.
        */ 
        if(pago){

            const foundPlanes = await PlanPago.find({name: {$in: pago}});
            console.log(foundPlanes)
            empresaNew.plan_pago = foundPlanes.map(plan => plan._id);
            console.log('ID ', empresaNew.plan_pago)
        }else{
            const planpay = await PlanPago.findOne({name:'GRATIS'});
            empresaNew.plan_pago = [planpay._id];
        }

        await empresaNew.save();

        const token = await generarJWT(newUser.id)

        res.json({
            ok:true,
            token,
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

empresaController.updateEmpresa = async(req, res) =>{
    const id = req.params.empresa_id;
    try {
        const empresaUpdate = await Empresa.findById(id);
        if(!empresaUpdate){
            return res.status(404).json({
                ok:false,
                message: 'No existe empresa con ese ID'
            });
        }
        const { name, rubro, tienda, first_name, last_name, email, password, role, pago } = req.body;

        if(empresaUpdate.tienda !== tienda){
            const existeTienda = await Empresa.findOne({tienda});
            //console.log('existe ', existeTienda);
            if(existeTienda){
                return res.status(400).json({
                    ok: false,
                    message: 'Ya existe una tienda con ese nombre'
                });
            }
        }
        
        const roleID = await Role.findOne({role});

        if(empresaUpdate.usuario !== null){
            const camposUser = {first_name, last_name, email, password, roleID};
            /* SI EXISTE: ACTUALIZA*/
            await User.findByIdAndUpdate(empresaUpdate.usuario, camposUser, {new: true});   
        }
        
        const pagoID = await PlanPago.findOne({'name': pago});
        const userID = await User.findOne({email});
    
        const camposEmpresa = {name, rubro, tienda, userID, pagoID};

        const empresaUpdated = await Empresa.findByIdAndUpdate(id, camposEmpresa, {new:true});

        res.status(200).json({
            ok: true,
            message: 'Empresa actualizada',
            empresa: empresaUpdated
        })
    } catch (error) {
        console.error('ERROR ', error);
        res.status(500).json({
            ok:false,
            message: 'ERROR inesperado.. revisa logs'
        })
    }
}

empresaController.deleteEmpresa = async(req, res)=>{
    const id = req.params.empresa_id;
    try {
        const empresa = await Empresa.findById(id);
        if(!empresa){
            return res.status(404).json({
                ok:false,
                message: 'No existe empresa con ese ID'
            });
        }
        await Empresa.findByIdAndDelete(id);

        res.json({
            ok: true,
            message: 'Empresa eliminada'
        });
    } catch (error) {
        console.error('ERROR ', error);
        res.status(500).json({
            ok:false,
            message: 'No se ha eliminado. Error SERVER, revisa logs'
        })
    }
}

module.exports = empresaController;