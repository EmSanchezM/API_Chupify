const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();
const { getEmpresas, getEmpresaById, createEmpresa } = require('../controllers/empresa.controller')

//Ruta: Obtener todas los empresas
router.get('/', getEmpresas);

//Ruta: Obtener una empresa por ID
router.get('/:empresa_id', getEmpresaById);

router.post('/', createEmpresa);

module.exports = router;