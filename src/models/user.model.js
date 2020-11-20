const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const Schemma = mongoose.Schema;

const userSchemma = Schemma({
    first_name: { type:String, required:[true, 'El nombre es requerido'] },
    last_name: {type:String, required:[true, 'El apellido es requerido'] },
    email: {type:String, unique:true, required:[true, 'El email es requerido']},
    password: {type: String, required:[true, 'La contraseña es requerida']},
    role: {type: Schemma.Types.ObjectId, ref: "Role"}
},{
    timestamps: true,
    versionKey: false,
})

userSchemma.statics.encryptPassword = async(password)=>{
    const salt = bcrypt.genSaltSync();
    return await bcrypt.hashSync(password, salt);
}

userSchemma.statics.comparePassword = async(password, receivedPassword)=>{
    return await bcrypt.compare(password, receivedPassword)
}

userSchemma.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('User', userSchemma);