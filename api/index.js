const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { router: authRoutes, verifyToken } = require('./auth'); // Certo, pois está na mesma pasta

// Importação das rotas (Agora corretamente dentro de `api/routes/`)
const routesanmdub = require('./api/routes/anime_dub');
const routesanmleg = require('./api/routes/anime_leg');
const routesfilmedub = require('./api/routes/filme_dub');
const routesfilmeleg = require('./api/routes/filme_leg');
const routeslancamentos = require('./api/routes/lancamentos');
const routesdetalhes = require('./api/routes/detalhes');
const routesepisodios = require('./api/routes/episodios');
const routespopulares = require('./api/routes/populares');
const routespesquisar = require('./api/routes/pesquisar');
const routeseps = require('./api/routes/listaEP');
const routesimg = require('./api/routes/imagens');
const routescategorias = require('./api/routes/categorias');
const routescategoria = require('./api/routes/categoria');
const routesfilte = require('./api/routes/filte');


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



app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`✅ Rota carregada: ${r.route.path}`);
  }
});



// Inicia o servidor
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
