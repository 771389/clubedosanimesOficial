const express = require('express');
const router = express.Router();
const axios = require('axios');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';

router.get('/pesquisar/:name', async (req, res) => {
  const name = req.params.name;

  const apiUrl = `https://animeland.atv2.net/videoweb/api.php?action=searchvideo&searchword=${name}`;

  const axiosConfig = {
    headers: {
      'User-Agent': userAgent,
    },
  };

  try {
    const response = await axios.get(apiUrl, axiosConfig);

    if (response.status === 200) {
      const data = response.data;

      const baseUrlForImages = 'https://cdn.atv2.net/img/';
      data.forEach(item => {
        if (item.category_icon && !item.category_icon.startsWith('http')) {
          item.category_icon = baseUrlForImages + item.category_icon;
        }
      });

      res.json(data);
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
