const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');

const createRoles = require('./helpers/initSetup')

const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');

const app = express();
createRoles();

app.set("port", process.env.PORT || 4000);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/usuarios', userRoute);
app.use('/api/auth', authRoute);

module.exports = app;