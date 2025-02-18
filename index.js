const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { router: authRoutes, verifyToken } = require('./auth');

const routesanmdub = require('./anime_dub');
const routesanmleg = require('./anime_leg');
const routesfilmedub = require('./filme_dub');
const routesfilmeleg = require('./filme_leg');
const routeslancamentos = require('./lancamentos');
const routesdetalhes = require('./detalhes');
const routesepisodios = require('./episodios');
const routespopulares = require('./populares');
const routespesquisar = require('./pesquisar');
const routeseps = require('./listaEP');
const routesimg = require('./imagens');
const routescategorias = require('./categorias');
const routescategoria = require('./categoria');
const routesfilte = require('./filte');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Rotas públicas (sem autenticação)
app.use('/auth', authRoutes);
app.use('/', routesimg);

// Rotas protegidas (exigem autenticação)
app.use('/home', verifyToken, [
  routesanmdub, routescategorias, routescategoria, 
  routesfilte, routesanmleg, routeslancamentos, 
  routespopulares
]);

app.use('/filmes', verifyToken, [routesfilmedub, routesfilmeleg]);
app.use('/anime', verifyToken, [routesdetalhes, routesepisodios, routeseps, routespesquisar]);

// Rota para erros 404
app.use('*', (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Inicia o servidor na porta definida no .env ou 8000 por padrão
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
