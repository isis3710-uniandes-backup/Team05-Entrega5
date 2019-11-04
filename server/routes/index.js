var express = require('express');
var router = express.Router();

var HandlerGenerator = require("../Autenticacion/HandlerGenerator.js");
var middleware = require("../Autenticacion/middleware.js");

HandlerGenerator = new HandlerGenerator();

router.post('/login', HandlerGenerator.login);

module.exports = router;