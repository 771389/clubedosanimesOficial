const express = require('express');
const router = express.Router();
const axios = require('axios');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';
const baseImageUrl = 'https://cdn.atv2.net/img/';

router.get('/detalhes/:id', async (req, res) => {
  const itemId = parseInt(req.params.id, 10);

  if (!itemId || isNaN(itemId)) {
    return res.status(400).send('Parâmetro id inválido');
  }

  const apiUrl = `https://animeland.atv2.net/videoweb/api.php?action=viewcategory&categoryid=${itemId}`;

  const axiosConfig = {
    headers: {
      'User-Agent': userAgent,
    },
    timeout: 5000
  };

  try {
    const response = await axios.get(apiUrl, axiosConfig);

    if (response.status === 200) {
      const data = response.data;

      data.forEach(item => {
        if (item.category_icon) {
          item.category_icon = baseImageUrl + item.category_icon;
        }
      });

      res.send(data);
    } else {
      console.log(`A solicitação falhou com o código de status: ${response.status}`);
      res.status(response.status).send(`Erro na solicitação: ${response.status}`);
    }
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('A solicitação excedeu o tempo limite.');
      res.status(504).send('A solicitação excedeu o tempo limite.');
    } else if (error.response) {
      console.error(`Erro na resposta da API: ${error.response.status}`);
      res.status(error.response.status).send(`Erro na resposta da API: ${error.response.status}`);
    } else {
      console.error('Ocorreu um erro na solicitação:', error.message || error);
      res.status(500).send('Erro interno do servidor');
    }
  }
});

module.exports = router;