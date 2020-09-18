const mongoose = require('mongoose');

const Schemma = mongoose.Schema;

const permissionSchemma = Schemma({
    name: String,
})

module.exports = mongoose.model('Permission', permissionSchemma);