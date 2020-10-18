const {Router} = require('express');

const router = Router();

const { getUserByEmail } = require('../controllers/user.controller');

//Ruta: Obtener un usuario por email
router.get('/:email', getUserByEmail);

module.exports = router;