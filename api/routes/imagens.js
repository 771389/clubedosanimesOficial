const express = require('express');
const axios = require('axios');
const router = express.Router();
const cheerio = require('cheerio');

router.get('/imagens', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const url = `https://mobile.alphacoders.com/by-category/${page}`;

    const userAgent = 'Mozilla/5.0';

    const config = {
      headers: {
        'User-Agent': userAgent,
      },
    };

    const response = await axios.get(url, config);

    const $ = cheerio.load(response.data);

    const images = [];
    $('.item a img').each((index, element) => {
      images.push($(element).attr('src'));
    });

    res.json({ images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar imagens.' });
  }
});

module.exports = router;