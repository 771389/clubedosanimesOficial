const express = require('express');
const router = express.Router();
const axios = require('axios');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';

router.get('/episodios/:id', (req, res) => {
  const itemId = req.params.id;
  const apiUrl = `https://animeland.atv2.net/videoweb/api.php?action=category_videos&category_id=${itemId}`;
  const axiosConfig = {
    headers: {
      'User-Agent': userAgent,
    },
  };

  axios.get(apiUrl, axiosConfig)
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;

        data.sort((a, b) => {
          const numeroEpisodioA = a.numeroEpisodio || Number.MAX_SAFE_INTEGER;
          const numeroEpisodioB = b.numeroEpisodio || Number.MAX_SAFE_INTEGER;
          return numeroEpisodioA - numeroEpisodioB;
        });

        res.send(data);
      } else {
        console.log(`A solicitação falhou com o código de status: ${response.status}`);
        res.status(response.status).send(`Erro na solicitação: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error('Ocorreu um erro na solicitação:', error);
      res.status(500).send('Erro interno do servidor');
    });
});

module.exports = router;
