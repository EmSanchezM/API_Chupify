const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const createRoles = require('./helpers/initSetup')

const userRoute = require('./routes/user.routes');
const busquedaRoute = require('./routes/busquedas.routes');
const authRoute = require('./routes/auth.routes');
const empresaRoute = require('./routes/empresa.routes');
const planesRoute = require('./routes/planes.routes');
const plantillasRoute = require('./routes/plantilla.routes');
const archivosRoute = require('./routes/archivos.routes');
const productosRoute = require('./routes/productos.routes');

const app = express();
createRoles();

app.set("port", process.env.PORT || 4000);
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/usuarios', userRoute);
app.use('/api/buscar', busquedaRoute);
app.use('/api/auth', authRoute);
app.use('/api/empresas', empresaRoute);
app.use('/api/planespago', planesRoute);
app.use('/api/plantillas', plantillasRoute);
app.use('/api/archivos', archivosRoute);
app.use('/api/productos', productosRoute);

module.exports = app;