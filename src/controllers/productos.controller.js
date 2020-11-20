const { response } = require('express');

//Modelos
const Producto = require('../models/producto.model');

const productoController = {};

productoController.getProductos = async(req, res)=>{
    const productos = await Producto.find()
    return res.json(productos);
}

productoController.getProductoById = async(req, res)=>{
    const producto = await Producto.findById(req.params.producto_id)
    return res.status(200).json(producto);
}

productoController.createProducto = async(req, res=response)=>{
    const {nombre, cantidad, precio } = req.body;
    try {
        const existeProducto = await Producto.findOne({name});
        if(existeProducto){
            return res.status(400).json({
                ok:false,
                message: 'El Producto ya esta registrado'
            });
        }

        const newProducto = new Producto({
            nombre,
            cantidad,
            precio,
        });
        await newProducto.save();

        res.json({
            ok:true,
            newProducto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            message: 'ERROR inesperado.. revisa logs'
        })
    }
}

productoController.updateProducto = async(req, res=response)=>{
    const id = req.params.producto_id;
    try {
        const productoUpdate = await Producto.findById(id);

        if(!productoUpdate){
            return res.status(404).json({
                ok:false,
                message: 'No existe producto con ese ID'
            });
        }
        const { nombre, cantidad, precio } = req.body;
        if(productoUpdate.nombre !== nombre){
            const existeProducto = await Producto.findOne({nombre});
            if(existeProducto){
                return res.status(400).json({
                    ok:true,
                    message: 'Ya existe un producto con ese nombre'
                });
            }
        }
        const campos = {nombre, cantidad, precio};
        const productoUpdated = await Producto.findByIdAndUpdate(id, campos, {new:true});
        res.status(200).json({
            ok:true,
            message: 'Producto actualizado',
            planpago: planPagoUpdated
        });
    } catch (error) {
        console.error('ERROR ', error);
        res.status(500).json({
            ok:false,
            message: 'ERROR inesperado SERVER.. revisa logs'
        })
    }
}

productoController.deleteProducto = async(req, res=response)=>{
    const id = req.params.producto_id;
    try {
        const producto = await Producto.findById(id);
        if(!producto){
            return res.status(400).json({
                ok: false,
                message: 'No existe producto con ese ID'
            });
        }

        await Producto.findByIdAndDelete(id);

        res.json({
            ok:true,
            message: 'Producto eliminado'
        });
    } catch (error) {
        console.error('ERROR ', error);
        res.status(500).json({
            ok:false,
            message: 'No se ha eliminado. ERROR insperado, revisa logs'
        })
    }
}

module.exports = productoController;