const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schemma = mongoose.Schema;

const empresaSchemma = Schemma({
    name: { type:String, required:[true, 'El nombre es requerido'] },
    rubro: {type:String, required:[true, 'El rubro es requerido'] },
    tienda: {type:String, required:[true, 'El nombre de la tienda es requerido']},
    usuario: {type: Schemma.Types.ObjectId, ref: "User"},
    plan_pago: {type: Schemma.Types.ObjectId, ref:"PlanPago"}
},{
    timestamps: true,
    versionKey: false,
})

empresaSchemma.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

empresaSchemma.method('toJSON', function(){
    const {_v, ...object } = this.toObject();
    return object;
})

module.exports = mongoose.model('Empresa', empresaSchemma);