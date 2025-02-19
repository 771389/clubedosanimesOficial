const express = require('express');
const router = express.Router();
const axios = require('axios');


const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'; // Substitua com o seu User-Agent


async function carregarEpisodiosDoAnime(animeId) {
  try {

    const response = await axios.get(`https://animeland.atv2.net/videoweb/api.php?action=category_videos&category_id=${animeId}`, {
      headers: {
        'User-Agent': userAgent,
      },
    });


    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Erro ao carregar episódios do anime: ${error.message}`);
  }
}

router.get('/episodios/anterior/:animeId/:currentEpisodeId', async (req, res) => {
  try {
    const animeId = req.params.animeId;
    const currentEpisodeId = parseInt(req.params.currentEpisodeId);

    
    const episodes = await carregarEpisodiosDoAnime(animeId);

   
    const currentIndex = episodes.findIndex((ep) => parseInt(ep.video_id) === currentEpisodeId);

    if (currentIndex === -1 || currentIndex === episodes.length - 1) {
    
      res.status(404).send('[{"title":"Episódio não encontrado ou é o primeiro episódio"}]');
      return;
    }

   
    const nextEpisode = episodes[currentIndex + 1];

    res.json(nextEpisode);
  } catch (error) {
    console.error('Ocorreu um erro na requisição:', error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.get('/episodios/proximo/:animeId/:currentEpisodeId', async (req, res) => {
  try {
    const animeId = req.params.animeId;
    const currentEpisodeId = parseInt(req.params.currentEpisodeId);

  
    const episodes = await carregarEpisodiosDoAnime(animeId);

   
    const currentIndex = episodes.findIndex((ep) => parseInt(ep.video_id) === currentEpisodeId);

    if (currentIndex === -1 || currentIndex === 0) {
      
      res.status(404).send('[{"title":"Episódio não encontrado ou é o ultimo episódio"}]');
      return;
    }

    
    const previousEpisode = episodes[currentIndex - 1];

    res.json(previousEpisode);
  } catch (error) {
    console.error('Ocorreu um erro na requisição:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
