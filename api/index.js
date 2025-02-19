const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { router: authRoutes, verifyToken } = require('./auth'); // Certo, pois está na mesma pasta

// Importação das rotas (Agora corretamente dentro de `api/routes/`)
const routesanmdub = require('./routes/anime_dub');
const routesanmleg = require('./routes/anime_leg');
const routesfilmedub = require('./routes/filme_dub');
const routesfilmeleg = require('./routes/filme_leg');
const routeslancamentos = require('./routes/lancamentos');
const routesdetalhes = require('./routes/detalhes');
const routesepisodios = require('./routes/episodios');
const routespopulares = require('./routes/populares');
const routespesquisar = require('./routes/pesquisar');
const routeseps = require('./routes/listaEP');
const routesimg = require('./routes/imagens');
const routescategorias = require('./routes/categorias');
const routescategoria = require('./routes/categoria');
const routesfilte = require('./routes/filte');

const app = express();

app.use(express.json());
app.use(cors());

// 🔹 Teste para ver se o servidor está carregando as rotas corretamente
console.log("🔹 Rotas carregadas corretamente!");

// 🔹 Rotas públicas
app.use('/api/auth', authRoutes);
app.use('/api/imagens', routesimg);

// 🔹 Rotas protegidas (JWT necessário)
app.use('/api/home', verifyToken, [
  routesanmdub, routescategorias, routescategoria, 
  routesfilte, routesanmleg, routeslancamentos, 
  routespopulares
]);

app.use('/api/filmes', verifyToken, [routesfilmedub, routesfilmeleg]);
app.use('/api/anime', verifyToken, [routesdetalhes, routesepisodios, routeseps, routespesquisar]);

// Rota para erros 404
app.use('*', (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Inicia o servidor
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
