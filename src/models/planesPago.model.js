
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schemma = mongoose.Schema;

const planesPagoSchemma = Schemma({
    name: {type: String, required: [true, 'Nombre del plan requerido']},
    duration: {type: String, required:[true, 'Duracion del plan requerido']},
    price: {type:String, required:[true, 'Precio del plan requerido']},
    description: {type:String, required: [true, 'Descripcion del plan requerida']}
},{
    versionKey: false
})


planesPagoSchemma.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

planesPagoSchemma.method('toJSON', function(){
    const {_v, ...object } = this.toObject();
    return object;
})

module.exports = mongoose.model('PlanPago', planesPagoSchemma);