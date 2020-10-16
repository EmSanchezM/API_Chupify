
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schemma = mongoose.Schema;

const clienteSchemma = Schemma({
    selacome: [{type: String, required: [true, 'es necesario que te la comas']}],
    usuario: [{type: Schemma.Types.ObjectId, ref: "User"}]
},{
    timestamps: true,
    versionKey: false,
})


clienteSchemma.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Cliente', clienteSchemma);