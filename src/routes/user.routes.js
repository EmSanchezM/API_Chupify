const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

const {getUsers, createUser} = require('../controllers/user.controller');

router.get('/', getUsers);

router.post('/', 
    [
        check('first_name', 'El nombre es obligatorio').not().isEmpty(),
        check('last_name', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos,
    ], 
    createUser
);


module.exports = router;