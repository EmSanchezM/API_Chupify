const {Router} = require('express');

const router = Router();

const authController = require('../controllers/auth.controller');

router.post('/registro', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;