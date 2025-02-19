const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Importação correta das rotas da pasta "routes/"
const routesanmdub = require(path.join(__dirname, '../routes/anime_dub'));
const routesanmleg = require(path.join(__dirname, '../routes/anime_leg'));
const routesfilmedub = require(path.join(__dirname, '../routes/filme_dub'));
const routesfilmeleg = require(path.join(__dirname, '../routes/filme_leg'));
const routeslancamentos = require(path.join(__dirname, '../routes/lancamentos'));
const routesdetalhes = require(path.join(__dirname, '../routes/detalhes'));
const routesepisodios = require(path.join(__dirname, '../routes/episodios'));
const routespopulares = require(path.join(__dirname, '../routes/populares'));
const routespesquisar = require(path.join(__dirname, '../routes/pesquisar'));
const routeseps = require(path.join(__dirname, '../routes/listaEP'));
const routesimg = require(path.join(__dirname, '../routes/imagens'));
const routescategorias = require(path.join(__dirname, '../routes/categorias'));
const routescategoria = require(path.join(__dirname, '../routes/categoria'));
const routesfilte = require(path.join(__dirname, '../routes/filte'));

// Definição das rotas da API
app.use('/api/home', [
  routesanmdub, routescategorias, routescategoria,
  routesfilte, routesanmleg, routeslancamentos,
  routespopulares
]);

app.use('/api/filmes', [routesfilmedub, routesfilmeleg]);
app.use('/api/anime', [routesdetalhes, routesepisodios, routeseps, routespesquisar]);
app.use('/api/imagens', routesimg);

// Rota de erro 404
app.use('*', (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Inicializa o servidor na porta definida no .env ou 8000 por padrão
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
