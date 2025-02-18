const express = require('express');
const cors = require('cors');
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


app.use('/', routesimg);
app.use('/home', routesanmdub);
app.use('/home', routescategorias);
app.use('/home', routescategoria);
app.use('/home', routesfilte);
app.use('/home', routesanmleg);
app.use('/home', routeslancamentos);
app.use('/home', routespopulares);
app.use('/filmes', routesfilmedub);
app.use('/filmes', routesfilmeleg);
app.use('/anime', routesdetalhes);
app.use('/anime', routesepisodios);
app.use('/anime', routeseps);
app.use('/anime', routespesquisar);

app.get('*', (req, res) => {
  res.status(404).json({
    "error": "Rota não encontrada"
  });
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});