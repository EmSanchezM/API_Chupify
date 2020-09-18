
const Role = require('../models/role.model')

const createRoles = async()=>{
   try {
       const countRoles = await Role.estimatedDocumentCount();
       
       if(countRoles>0) return;

        const valuesRoles = Promise.all([
            new Role({name:"ADMIN_ROLE"}).save(),
            new Role({name:"EMPRESA_ROLE"}).save(),
            new Role({name:"USER_ROLE"}).save()
        ]);
       
   } catch (error) {
       console.error('ERROR ', error);
   }
}

module.exports = createRoles;