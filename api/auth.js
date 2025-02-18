router.post('/login', (req, res) => {
  try {
    console.log("🚀 Recebendo tentativa de login:", req.body); // Log para ver os dados recebidos

    const { username, password } = req.body;

    if (!username || !password) {
      console.log("❌ Falha no login: Usuário ou senha vazios");
      return res.status(400).json({ error: "Preencha usuário e senha" });
    }

    if (username !== USERNAME || password !== PASSWORD) {
      console.log("❌ Falha no login: Credenciais inválidas");
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("⚠️ Erro: JWT_SECRET não definido!");
      return res.status(500).json({ error: "Erro interno no servidor: JWT_SECRET ausente" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login bem-sucedido! Token gerado:", token);
    res.json({ token });

  } catch (error) {
    console.error("💥 Erro inesperado no login:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});
