const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
const { getPlanesPago, getPlanesPagoById, createPlanPago, updatePlanPago, deletePlanPago } = require('../controllers/planes.controller');

//RUTA: Obtener todos los planes de pago
router.get('/', getPlanesPago);

//RUTA: Obtener un plan de pago por ID
router.get('/:plan_id', getPlanesPagoById);

//RUTA: Crear un plan de pago
router.post('/', [
    check('name', 'El nombre del plan es obligatorio').not().isEmpty(),
    check('duration', 'La duracion es obligatorioa').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
]
,createPlanPago);

//RUTA: Actualizar un plan de pago
router.put('/:plan_id',[
    check('name', 'El nombre del plan es obligatorio').not().isEmpty(),
    check('duration', 'La duracion es obligatorioa').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
], updatePlanPago);

//RUTA: Eliminar un plan de pago
router.delete('/:plan_id', deletePlanPago);

module.exports = router;