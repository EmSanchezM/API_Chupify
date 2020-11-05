const { response } = require('express');

//Modelos
const PlanPago = require('../models/planesPago.model');

const planPagoController = {};

planPagoController.getPlanesPago = async(req, res)=>{
    const planesPago = await PlanPago.find()
    return res.json(planesPago);
}

planPagoController.getPlanesPagoById = async(req, res)=>{
    const planPago = await PlanPago.findById(req.params.plan_id)
    return res.status(200).json(planPago);
}

planPagoController.createPlanPago = async(req, res)=>{
    const {name, duration, price, description } = req.body;
    try {
        const existePlan = await PlanPago.findOne({name});
        if(existePlan){
            return res.status(400).json({
                ok:false,
                message: 'El Plan de pago ya esta registrado'
            });
        }

        const newPlan = new PlanPago({
            name,
            duration,
            price,
            description
        });
        await newPlan.save();

        res.json({
            ok:true,
            newPlan
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            message: 'ERROR inesperado.. revisa logs'
        })
    }
}

planPagoController.updatePlanPago = async(req, res)=>{
    const id = req.params.plan_id;
    try {
        const planUpdate = await PlanPago.findById(id);

        if(!planUpdate){
            return res.status(404).json({
                ok:false,
                message: 'No existe plan de pago con ese ID'
            });
        }
        const {name, duration, price, description} = req.body;
        if(planUpdate.name !== name){
            const existePlan = await PlanPago.findOne({name});
            if(existePlan){
                return res.status(400).json({
                    ok:true,
                    message: 'Ya existe un plan con ese nombre'
                });
            }
        }
        const campos = {name, duration, price, description};
        const planPagoUpdated = await PlanPago.findByIdAndUpdate(id, campos, {new:true});
        res.status(200).json({
            ok:true,
            message: 'Plan de pago actualizado',
            planpago: planPagoUpdated
        });
    } catch (error) {
        console.error('ERROR ', error);
        res.status(500).json({
            ok:false,
            message: 'ERROR inesperado SERVER.. revisa logs'
        })
    }
}

planPagoController.deletePlanPago = async(req, res)=>{
    const id = req.params.plan_id;
    try {
        const planPago = await PlanPago.findById(id);
        if(!planPago){
            return res.status(400).json({
                ok: false,
                message: 'No existe plan de pago con ese ID'
            });
        }

        await PlanPago.findByIdAndDelete(id);

        res.json({
            ok:true,
            message: 'Plan de pago eliminado'
        });
    } catch (error) {
        console.error('ERROR ', error);
        res.status(500).json({
            ok:false,
            message: 'No se ha eliminado. ERROR insperado, revisa logs'
        })
    }
}

module.exports = planPagoController;