const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
const { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } = require('../controllers/productos.controller');

//Ruta: Obtener todas los productos
router.get('/', getProductos);

//Ruta: Obtener un producto por ID
router.get('/:empresa_id', getProductoById);

//Ruta: crear un producto
router.post('/', createProducto);

//Ruta: actualizar producto
router.put('/:producto_id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
    check('precio', 'El precio del producto es obligatorio').not().isEmpty(),
    validarCampos,
], updateProducto);

//Ruta: eliminar producto
router.delete('/:producto_id', deleteProducto);

module.exports = router;