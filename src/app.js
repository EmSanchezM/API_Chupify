const express = require("express");

const app = express()

app.set('port', process.env.port || 3000)

module.exports = app;