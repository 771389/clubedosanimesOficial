const express = require('express');
const cors = require('cors');
const routesanmdub = require('./routes/anime_dub');
const routesanmleg = require('./routes/anime_leg');
const routesfilmedub = require('./routes/filme_dub');
const routesfilmeleg = require('./routes/filme_leg');

const app = express();
app.use(express.json());

app.use(cors());


app.use('/home', routesanmdub);
app.use('/home', routesanmleg);
app.use('/filmes', routesfilmedub);
app.use('/filmes', routesfilmeleg);


app.get('*', (req, res) => {
  res.status(404).json({
    "error": "Rota não encontrada"
  });
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
