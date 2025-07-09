const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video.controller');

router.post('/', videoController.criarVideo);
router.get('/', videoController.listarVideos);


module.exports = router;
