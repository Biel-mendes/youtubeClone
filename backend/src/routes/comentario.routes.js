const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentario.controller');

router.post('/', comentarioController.criarComentario);
router.get('/:video_id', comentarioController.listarComentariosPorVideo);

module.exports = router;
