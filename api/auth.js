const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// Credenciais fixas (mude para um sistema mais seguro no futuro)
const USERNAME = "ojusticeirobr";
const PASSWORD = "ojusticeirobr";

// Rota de login para gerar um token JWT
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  // Gerar token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ 
    message: "Login realizado com sucesso!",
    token, 
    expiresIn: "1h"
  });
});

// Middleware para proteger rotas
const verifyToken = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({ error: "Acesso negado! Token ausente." });
  }

  try {
    token = token.replace('Bearer ', ''); // Remover prefixo "Bearer " se existir
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};

module.exports = { router, verifyToken };
