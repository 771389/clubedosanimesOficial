const express = require('express');
const router = express.Router();
const axios = require('axios');


// Define um User-Agent personalizado
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';

// Rota para /dublados
router.get('/legendados', (req, res) => {
  // URL da API com a rota /dublados
  const apiUrl = 'https://animeland.appanimeplus.tk/videoweb/api.php?action=searchvideo&searchword=';

  // Configuração da solicitação Axios, incluindo o User-Agent personalizado
  const axiosConfig = {
    headers: {
      'User-Agent': userAgent,
    },
  };

  // Realiza uma solicitação GET à rota /dublados com a configuração personalizada
  axios.get(apiUrl, axiosConfig)
    .then((response) => {
      // Verifica se a solicitação foi bem-sucedida (código de status HTTP 200)
      if (response.status === 200) {
        // A resposta da API está em response.data
        const data = response.data;

        // Filtra os resultados para pegar apenas aqueles que não contêm "dublado" no título
        const filteredData = data.filter(item => !item.category_name.toLowerCase().includes('dublado'));

        res.send(filteredData); // Envia os dados filtrados como resposta para a rota
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