const db = require('../models/db');
const bcrypt = require('bcrypt');

// Cadastrar usuário
exports.criarUsuario = async (req, res) => {
  const { nome, email, senha, avatar_url, cep, endereco, complemento, numero, cidade, uf } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const sql = `INSERT INTO usuarios (nome, email, senha, avatar_url, cep, endereco, complemento, numero, cidade, uf)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [nome, email, hashedPassword, avatar_url, cep, endereco, complemento, numero, cidade, uf];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir usuário:', err);
        return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
      }
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criptografar senha' });
  }
};


exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }

    if (results.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const usuario = results[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    // Opcional: gerar token
    // const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        avatar_url: usuario.avatar_url
      }
      // token: token
    });
  });
};

// Recuperar senha (simulado)
exports.recuperarSenha = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ erro: 'Informe o email' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ erro: 'Erro interno' });
    }

    if (results.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    // Simulação de envio de e-mail
    res.status(200).json({
      mensagem: 'E-mail encontrado. Um link de redefinição de senha foi enviado (simulado).',
      dica: 'Simulação: redefina sua senha entrando em contato com o suporte ou usando um modal no app.'
    });
  });
};
