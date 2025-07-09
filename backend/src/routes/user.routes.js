const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/user.controller');

router.post('/', usuarioController.criarUsuario);
router.post('/login', usuarioController.login);
router.post('/recuperar', usuarioController.recuperarSenha);


module.exports = router;
