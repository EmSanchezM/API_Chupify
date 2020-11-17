const { Router } = require('express');
const expressFileUplad = require('express-fileupload');

const { subirArchivo, retornarArchivo } = require('../controllers/archivos.controller');

const router = Router();

router.use(expressFileUplad);

router.put('/:tipo/:id', subirArchivo);

router.get('/:tipo/:archivo', retornarArchivo);

module.exports = router;