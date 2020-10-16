
const Role = require('../models/role.model');
const PlanesPago = require('../models/planesPago.model');

const createRoles = async()=>{
   try {
       const countRoles = await Role.estimatedDocumentCount();
       const countPlanes = await PlanesPago.estimatedDocumentCount();
       
       if(countRoles>0 && countPlanes>0) return;

        const valuesRoles = Promise.all([
            new Role({name:"ADMIN_ROLE"}).save(),
            new Role({name:"EMPRESA_ROLE"}).save(),
            new Role({name:"USER_ROLE"}).save(),
            new PlanesPago({name: 'BASICO', duration:'6 meses', price:6550, description:'Creacion de tu tienda, Productos ilimitados, Informes profesionales'}).save(),
            new PlanesPago({name: 'GRATIS', duration:'1 mes', price:0, description:'Creacion de tu tienda, Productos ilimitados, No hay informes'}).save(),
            new PlanesPago({name: 'PROFESIONAL', duration:'1 año', price:10550, description:'Creacion de tu tienda, Productos ilimitados, Generador de informes'}).save()
        ]);

   } catch (error) {
       console.error('ERROR ', error);
   }
}

module.exports = createRoles;