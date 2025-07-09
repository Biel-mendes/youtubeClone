const db = require('../models/db');

// Cadastrar novo vídeo
exports.criarVideo = (req, res) => {
  const { usuario_id, titulo, descricao, video_url } = req.body;

  if (!usuario_id || !video_url) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
  }

  const sql = `INSERT INTO videos (usuario_id, titulo, descricao, video_url)
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [usuario_id, titulo, descricao, video_url], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar vídeo:', err);
      return res.status(500).json({ erro: 'Erro ao cadastrar vídeo' });
    }

    res.status(201).json({ mensagem: 'Vídeo cadastrado com sucesso!' });
  });
};


// Listar vídeos
exports.listarVideos = (req, res) => {
  const sql = `
    SELECT v.id, v.titulo, v.descricao, v.video_url, v.criado_em,
           u.id AS usuario_id, u.nome AS autor, u.avatar_url
    FROM videos v
    JOIN usuarios u ON v.usuario_id = u.id
    ORDER BY v.criado_em DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar vídeos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar vídeos' });
    }

    res.status(200).json(results);
  });
};
