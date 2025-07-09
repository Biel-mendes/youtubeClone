const db = require('../models/db');

// Curtir um vídeo
exports.curtirVideo = (req, res) => {
  const { video_id, usuario_id } = req.body;

  if (!video_id || !usuario_id) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
  }

  const verificarSql = `SELECT * FROM curtidas WHERE video_id = ? AND usuario_id = ?`;

  db.query(verificarSql, [video_id, usuario_id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar curtida' });

    if (results.length > 0) {
      return res.status(200).json({ mensagem: 'Usuário já curtiu esse vídeo' });
    }

    const inserirSql = `INSERT INTO curtidas (video_id, usuario_id) VALUES (?, ?)`;

    db.query(inserirSql, [video_id, usuario_id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao curtir vídeo' });

      res.status(201).json({ mensagem: 'Vídeo curtido com sucesso!' });
    });
  });
};
