const express = require('express');
const router = express.Router();
const axios = require('axios');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';

const checkCountryCode = async () => {
  const apiCheckUrl = 'https://api-ip-xi.vercel.app/';
  try {
    const response = await axios.get(apiCheckUrl, {
      headers: { 'User-Agent': userAgent }
    });
    const countryCode = response.data.countryCode;
    console.log(countryCode);
    return countryCode;
  } catch (error) {
    throw new Error('Erro ao verificar countryCode');
  }
};


router.get('/episodios/:id', async (req, res) => {
  try {
    const countryCode = await checkCountryCode();

    if (countryCode === 'BR') {
      const itemId = req.params.id;
      const apiUrl = `https://animeland.appanimeplus.tk/videoweb/api.php?action=category_videos&category_id=${itemId}`;
      const axiosConfig = {
        headers: {
          'User-Agent': userAgent,
        },
      };

      const response = await axios.get(apiUrl, axiosConfig);

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
    } else {
      res.status(403).send('Acesso negado: serviço indisponível fora do Brasil.');
    }
  } catch (error) {
    console.error('Ocorreu um erro:', error.message);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
