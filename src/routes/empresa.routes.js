const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();
const { getEmpresas, getEmpresaById, createEmpresa, updateEmpresa, deleteEmpresa } = require('../controllers/empresa.controller');

//Ruta: Obtener todas los empresas
router.get('/', getEmpresas);

//Ruta: Obtener una empresa por ID
router.get('/:empresa_id', getEmpresaById);

//Ruta: crear una empresa
router.post('/', createEmpresa);

//Ruta: actualizar empresa
router.put('/:empresa_id', [
    check('first_name', 'El nombre es obligatorio').not().isEmpty(),
    check('last_name', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('name', 'El nombre de la empresa es obligatorio').not().isEmpty(),
    check('rubro', 'El rubro de la empresa es obligatorio').not().isEmpty(),
    check('tienda', 'El nombre de la tienda es obligatorio').not().isEmpty(),
    check('role', 'El rol de usuario es obligatorio').not().isEmpty(),
    check('pago', 'El plan de pago es obligatorio').not().isEmpty(),
    validarCampos,
], updateEmpresa);

//Ruta: eliminar empresa
router.delete('/:empresa_id', deleteEmpresa);

module.exports = router;