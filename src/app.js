const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan')

const userRoute = require('./routes/user.routes')
const app = express()

app.set("port", process.env.PORT || 4000);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', userRoute);

module.exports = app;