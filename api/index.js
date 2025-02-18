const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Configurar variáveis de ambiente
dotenv.config();

const { router: authRoutes, verifyToken } = require('./api/auth');

// Importação correta das rotas
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

// Rotas públicas (sem autenticação)
app.use('/api/auth', authRoutes);
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
