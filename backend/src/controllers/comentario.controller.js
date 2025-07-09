const db = require('../models/db');

// Adicionar comentário
exports.criarComentario = (req, res) => {
  const { video_id, usuario_id, mensagem } = req.body;

  if (!video_id || !usuario_id || !mensagem) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
  }

  const sql = `INSERT INTO comentarios (video_id, usuario_id, mensagem)
               VALUES (?, ?, ?)`;

  db.query(sql, [video_id, usuario_id, mensagem], (err, result) => {
    if (err) {
      console.error('Erro ao inserir comentário:', err);
      return res.status(500).json({ erro: 'Erro ao comentar' });
    }

    res.status(201).json({ mensagem: 'Comentário adicionado com sucesso!' });
  });
};

// Listar comentários de um vídeo
exports.listarComentariosPorVideo = (req, res) => {
  const video_id = req.params.video_id;

  const sql = `
    SELECT c.id, c.mensagem, c.criado_em,
           u.id AS usuario_id, u.nome AS autor, u.avatar_url
    FROM comentarios c
    JOIN usuarios u ON c.usuario_id = u.id
    WHERE c.video_id = ?
    ORDER BY c.criado_em DESC
  `;

  db.query(sql, [video_id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar comentários:', err);
      return res.status(500).json({ erro: 'Erro ao buscar comentários' });
    }

    res.status(200).json(results);
  });
};
