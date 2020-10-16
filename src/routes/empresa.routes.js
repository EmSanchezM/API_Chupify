const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();
const { getEmpresas, createEmpresa } = require('../controllers/empresa.controller')

//Ruta: Obtener todas los empresas
router.get('/', getEmpresas);

router.post('/', createEmpresa);

module.exports = router;