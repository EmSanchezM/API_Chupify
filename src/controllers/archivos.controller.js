const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarArchivos } = require('../helpers/gestion-archivos');

const subirArchivo = (req, res= response) =>{
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['empresas', 'temas'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            message: 'No es un tipo valido'
        });
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            message: 'No hay ningún archivo'
        });
    }

    const archivo = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length-1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            message: 'NO es una extension valida'
        });
    }

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    const ruta = `./archivos/${tipo}/${nombreArchivo}`;

    archivo.mv(ruta, (error)=>{
        if(error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Error al mover el archivo'
            });
        }
        actualizarArchivos(tipo, id, nombreArchivo);
        res.json({
            ok: true,
            message: 'Archivo subido',
            nombreArchivo
        });
    })
}

const retornarArchivo = (req, res=response)=>{
    const tipo = req.params.tipo;
    const archivo = req.params.archivo;

    const rutaArchivo = path.join(__dirname, `../archivos/${tipo}/${archivo}`);
    
    if(fs.existsSync(rutaArchivo)){
        res.sendFile(rutaArchivo);
    }else{
        const rutaArchivo = path.join(__dirname, `../archivos/no-img.jpg`);
        res.sendFile(rutaArchivo);
    }
}

module.exports = { subirArchivo, retornarArchivo }