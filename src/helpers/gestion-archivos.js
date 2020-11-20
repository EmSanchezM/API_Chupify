const fs = require('fs');

/*MODELOS*/
const Empresa = require('../models/empresa.model');
const Plantillas = require('../models/plantillas.model');

const borrarArchivo = ( ruta ) => {
    if(fs.existsSync( ruta)){
        fs.unlinkSync(ruta);
    }
}

const actualizarArchivo = async(tipo, id, nombreArchivo)=>{
    let rutaVieja = '';

    switch(tipo){
        case 'plantilla': 
            const plantilla = await Plantillas.findById(id);
            if(!plantilla){
                console.log('Plantilla no encontrada');
                return false;
            }

            rutaVieja = `archivos/plantillas/${plantilla.imagenes}`;
            borrarArchivo(rutaVieja);
            plantilla.imagenes = nombreArchivo;
            await plantilla.save();
            return true;
        break;
        
        case 'producto':
            const producto = await producto.findById(id);
            if(!producto){
                console.log('Producto no encontrado');
                return false;
            }

            rutaVieja = `archivos/productos/${producto.img}`;
            borrarArchivo(rutaVieja);
            producto.img = nombreArchivo;
            await producto.save();
            return true;
        break;
        
    }
}

module.exports = {actualizarArchivo}