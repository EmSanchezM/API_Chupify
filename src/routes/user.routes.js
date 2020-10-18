const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

const {getUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser} = require('../controllers/user.controller');

//TODO: Validar token

//Ruta: Obtener todos los usuarios
router.get('/', getUsers);

//Ruta: Obtener un usuario por ID
router.get('/:user_id', getUserById);

//Ruta: Pbtener un usuario por email
router.get('/:email', getUserByEmail);

//Ruta: Crear un usuario
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

//Ruta: Editar un usuario
router.put('/:user_id',
    [
        check('first_name', 'El nombre es obligatorio').not().isEmpty(),
        check('last_name', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('role', 'El rol de usuario es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    updateUser);

//Ruta: eliminar un usuario
router.delete('/:user_id', deleteUser);

module.exports = router;