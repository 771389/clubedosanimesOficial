const express = require('express');
const router = express.Router();
const axios = require('axios');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';

router.get('/lancamentos', async (req, res) => {
  const apiUrl = 'https://animeland.atv2.net/videoweb/api.php?action=latestvideos';

  const axiosConfig = {
    headers: {
      'User-Agent': userAgent,
    },
  };

  try {
    const response = await axios.get(apiUrl, axiosConfig);

    if (response.status === 200) {
      const responseData = response.data.replace(/0$/, '');

      try {
        const data = JSON.parse(responseData);

        const baseUrlForImages = 'https://cdn.atv2.net/img/';
        data.forEach(item => {
          if (item.image && !item.image.startsWith('http')) {
            item.image = baseUrlForImages + item.image;
          }
        });

        res.json(data);

      } catch (error) {
        console.error('Erro ao analisar JSON:', error);
        res.status(500).send('Erro ao analisar a resposta da API');
      }
    } else {
      console.error(`A solicitação falhou com o código de status: ${response.status}`);
      res.status(response.status).send(`Erro na solicitação: ${response.status}`);
    }
  } catch (error) {
    console.error('Ocorreu um erro na solicitação:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
