const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
const { getPlantillas, getPlantillaById } = require('../controllers/plantilla.controller');

//RUTA: obtener todas las plantillas
router.get('/', getPlantillas);

//Ruta: Obtener plantilla por id 
router.get('/:plantilla_id', getPlantillaById);

module.exports = router;