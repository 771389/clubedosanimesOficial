const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Credenciais fixas
const USERNAME = "ojusticeirobr";
const PASSWORD = "ojusticeirobr";

// Gerar Token JWT
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

// Middleware para proteger rotas
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({ error: "Acesso negado! Token ausente" });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

module.exports = { router, verifyToken };
