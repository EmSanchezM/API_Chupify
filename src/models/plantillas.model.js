const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schemma = mongoose.Schema;

const plantillaSchemma = Schemma({
    titulo: {type:String, required:[true, 'El nombre del tema es requerido']},
    description: {type:String, required:[true, 'La descripcion del tema es requerido']},
    css: {type:String, required:[true, 'Estilos css del tema es requerido']},
    js: {type:String, required:[true, 'Javascripts del tema es requerido']},
    preview: {type:String, required:[true, 'Vista previa requerido']},
    imagenes: [{type:String}]
},{
    timestamps:true,
    versionKey: false
})

plantillaSchemma.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})

module.exports = mongoose.model('Plantilla', plantillaSchemma);
