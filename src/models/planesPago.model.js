
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schemma = mongoose.Schema;

const planesValidos = {
    values: ['GRATIS', 'BASICO', 'PROFESIONAL'],
    message: '{VALUE} no es un plan permitido'
};

const durationValidas = {
    values: ['1 mes', '6 meses', '1 año'],
    message: '{VALUE} no es una duracion permitida'
};

const preciosValidos = {
    values: ['0', '6550', '10550'],
    message: '{VALUE} no es un precio permitido'
}

const planesPagoSchemma = Schemma({
    name: {type: String, required: true, enum: planesValidos},
    duration: {type: String, required:true, enum: durationValidas},
    price: {type:String, required:true, enum: preciosValidos },
    description: {type:String, required: [true, 'Descripcion del plan requerida']}
},{
    timestamps: true,
    versionKey: false,
})


planesPagoSchemma.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('PlanPago', planesPagoSchemma);