const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { router: authRoutes, verifyToken } = require('./auth');

const app = express();

app.use(express.json());
app.use(cors());

// 🔹 Importação correta das rotas dentro da pasta "routes"
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

console.log("🔹 Rotas carregadas:", Object.keys(authRoutes));

// 🔹 Definição de rotas (agora todas estão dentro de `/api/`)
app.use('/api/auth', authRoutes);
app.use('/api/imagens', routesimg);
app.use('/api/home', verifyToken, [
  routesanmdub, routescategorias, routescategoria, 
  routesfilte, routesanmleg, routeslancamentos, 
  routespopulares
]);
app.use('/api/filmes', verifyToken, [routesfilmedub, routesfilmeleg]);
app.use('/api/anime', verifyToken, [routesdetalhes, routesepisodios, routeseps, routespesquisar]);

// 🔹 Rota para arquivos estáticos (opcional, caso precise servir HTML/CSS/JS do `public`)
app.use(express.static(path.join(__dirname, '../public')));

// 🔹 Rota para erros 404
app.use('*', (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// 🔹 Inicia o servidor na porta definida no .env ou 8000 por padrão
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
