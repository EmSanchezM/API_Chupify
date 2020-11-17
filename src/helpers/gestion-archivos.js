const fs = require('fs');

/*MODELOS*/
const Empresa = require('../models/empresa.model');

const borrarArchivo = ( ruta ) => {
    if(fs.existsSync( ruta)){
        fs.unlinkSync(ruta);
    }
}

const actualizarArchivo = async(tipo, id, nombreArchivo)=>{
    let rutaVieja = '';

    switch(tipo){
        case 'empresa': 
            const empresa = await Empresa.findById(id);
            if(!empresa){
                console.log('EMPRESA no encontrada');
                return false;
            }

            rutaVieja = `archivos/empresas/${empresa.img}`;
            borrarArchivo(rutaVieja);
            empresa.img = nombreArchivo;
            await empresa.save();
            return true;
        break;


    }
}

module.exports = {actualizarArchivo}