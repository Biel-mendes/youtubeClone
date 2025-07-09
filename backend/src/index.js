const express = require('express');
const router = express.Router();

const userRoutes = require('./routes/user.routes');
const videoRoutes = require('./routes/video.routes');
const comentarioRoutes = require('./routes/comentario.routes');
const curtidaRoutes = require('./routes/curtida.routes');


router.use('/curtidas', curtidaRoutes);
router.use('/usuarios', userRoutes);
router.use('/videos', videoRoutes);
router.use('/comentarios', comentarioRoutes);

module.exports = router;
