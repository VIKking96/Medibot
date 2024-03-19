// users/routes.js
const express = require('express');
const router = express.Router();
const controller = require('./userController');

router.post('/createaccount', controller.createUser);

module.exports = router;
