
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schemma = mongoose.Schema;

const clienteSchemma = Schemma({
    usuario: {type: Schemma.Types.ObjectId, ref: "User"}
},{
    timestamps: true,
    versionKey: false,
})


clienteSchemma.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

clienteSchemma.method('toJSON', function(){
    const {_v, ...object } = this.toObject();
    return object;
})

module.exports = mongoose.model('Cliente', clienteSchemma);