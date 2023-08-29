const express = require('express');
const axios = require('axios');
const router = express.Router();
const cheerio = require('cheerio');

// Endpoint para web scraping e paginação de imagens
router.get('/imagens', async (req, res) => {
  try {
    const page = req.query.page || 1; // Página atual (parâmetro da consulta)
    const url = `https://mobile.alphacoders.com/by-category/${page}`;

    // Defina um User-Agent personalizado (substitua-o pelo seu próprio)
    const userAgent = 'Mozilla/5.0';

    // Configurar a solicitação com o User-Agent
    const config = {
      headers: {
        'User-Agent': userAgent,
      },
    };

    // Realizar a requisição HTTP para a página web
    const response = await axios.get(url, config);

    // Carregar o HTML da página raspada usando o Cheerio
    const $ = cheerio.load(response.data);

    // Extrair as imagens da página
    const images = [];
    $('.item a img').each((index, element) => {
      images.push($(element).attr('src'));
    });

    // Enviar a lista de imagens como resposta
    res.json({ images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar imagens.' });
  }
});

module.exports = router;