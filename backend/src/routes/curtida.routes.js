const express = require('express');
const router = express.Router();
const curtidaController = require('../controllers/curtida.controller');

router.post('/', curtidaController.curtirVideo);

module.exports = router;
