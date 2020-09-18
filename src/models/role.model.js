const mongoose = require('mongoose');

const Schemma = mongoose.Schema;

const rolesValidos = {
    values: ['ADMIN_ROLE', 'EMPRESA_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

const roleSchemma = Schemma({
    name:{type: String, required:true, enum: rolesValidos}
},{
    versionKey: false
})

module.exports = mongoose.model('Role', roleSchemma);