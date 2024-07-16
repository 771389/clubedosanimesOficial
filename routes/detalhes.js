const express = require('express');
const router = express.Router();
const axios = require('axios');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';

// Defina a base URL da imagem
const baseImageUrl = 'https://cdn.appanimeplus.tk/img/';

router.get('/detalhes/:id', (req, res) => {
  const itemId = req.params.id;

  // Validação básica do itemId
  if (!itemId || isNaN(itemId)) {
    return res.status(400).send('Parâmetro id inválido');
  }

  const apiUrl = `https://animeland.appanimeplus.tk/videoweb/api.php?action=viewcategory&categoryid=${itemId}`;

  const axiosConfig = {
    headers: {
      'User-Agent': userAgent,
    },
    timeout: 5000  // Timeout de 5 segundos
  };

  axios.get(apiUrl, axiosConfig)
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;

        // Se a resposta for uma lista de objetos
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (item.category_icon) {
              item.category_icon = `${baseImageUrl}${item.category_icon}`;
            }
          });
        } else if (data.category_icon) { // Se for um objeto único
          data.category_icon = `${baseImageUrl}${data.category_icon}`;
        }

        res.send(data);
      } else {
        console.log(`A solicitação falhou com o código de status: ${response.status}`);
        res.status(response.status).send(`Erro na solicitação: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error('Ocorreu um erro na solicitação:', error.message || error);
      res.status(500).send('Erro interno do servidor');
    });
});

module.exports = router;
