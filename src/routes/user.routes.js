const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

const {getUsers, getUserById, createUser} = require('../controllers/user.controller');

router.get('/', getUsers);

router.get('/:user_id', getUserById);

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