const { response } = require('express');

//Modelos
const Plantilla = require('../models/plantillas.model');

const plantillaController = {};

//Obtener todas las plantillas
plantillaController.getPlantillas = async(req, res)=>{
    try {
        const plantillas = await Plantilla.find()
        return res.status(200).json(plantillas);
    } catch (error) {
        res.status(400).json({
            ok:false,
            message: `ERROR al obtener plantillas ${error}`
        })
    }
}

plantillaController.getPlantillaById = async(req, res)=>{
    try {
        const plantilla = await Plantilla.findById(req.params.plantilla_id)
        return res.status(20).json(plantilla)
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: `ERROR al obtener plantilla ${error}`
        })
    }
}

module.exports = plantillaController;