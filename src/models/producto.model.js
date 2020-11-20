const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schemma = mongoose.Schema;

const productoSchemma = Schemma({
    nombre: {type: String, required:[true, 'El nombre del producto es requerido']},
    cantidad: {type: String, required:[true, 'La cantidad del producto es requerido']},
    precio: {type: String, required:[true, 'El precio del producto es requerido']},
    img:{type:String}
},{
    timestamps: true,
    versionKey: false
})

productoSchemma.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})

module.exports = mongoose.model('Producto', productoSchemma);