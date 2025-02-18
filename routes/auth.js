const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// Usuários fictícios (substituir por um banco de dados real)
const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("123456", 10), // Senha criptografada
  },
];

// Gerar um token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "Usuário não encontrado" });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  const token = generateToken(user);
  res.json({ token });
});

// Rota protegida de teste
router.get('/perfil', verifyToken, (req, res) => {
  res.json({ message: "Acesso autorizado!", user: req.user });
});

// Middleware para verificar o token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: "Token não fornecido" });
  }

  jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { router, verifyToken };
