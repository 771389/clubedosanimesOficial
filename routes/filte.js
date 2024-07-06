const express = require('express');
const router = express.Router();

const categories = [
  { title: "Ação", slug: "acao" },
  { title: "Aventura", slug: "aventura" },
  { title: "Comédia", slug: "comedia" },
  { title: "Drama", slug: "drama" },
  { title: "Slice of Life", slug: "slice-of-life" },
  { title: "Fantasia", slug: "fantasia" },
  { title: "Magia", slug: "magia" },
  { title: "Sobrenatural", slug: "sobrenatural" },
  { title: "Terror", slug: "terror" },
  { title: "Mistério", slug: "misterio" },
  { title: "Psicológico", slug: "psicologico" },
  { title: "Romance", slug: "romance" },
  { title: "Sci-Fi", slug: "sci-fi" },
  { title: "Cyberpunk", slug: "cyberpunk" },
  { title: "Espaço", slug: "espaco" },
  { title: "Jogos", slug: "jogos" },
  { title: "Hentai", slug: "hentai" },
  { title: "Mecha", slug: "mecha" },
  { title: "Música", slug: "musica" },
  { title: "Paródia", slug: "parodia" },
  { title: "Samurai", slug: "samurai" },
  { title: "Esportes", slug: "esportes" },
  { title: "Super Poder", slug: "super-poder" },
  { title: "Vampiro", slug: "vampiro" },
  { title: "Yaoi", slug: "yaoi" },
  { title: "Yuri", slug: "yuri" },
  { title: "Shounen", slug: "shounen" },
  { title: "Shoujo", slug: "shoujo" },
  { title: "Josei", slug: "josei" },
  { title: "Seinen", slug: "seinen" },
  { title: "Militar", slug: "militar" },
  { title: "Policial", slug: "policial" },
  { title: "Thriller", slug: "thriller" },
  { title: "Demônios", slug: "demonios" },
  { title: "Histórico", slug: "historico" },
  { title: "Ecchi", slug: "ecchi" },
  { title: "Kids", slug: "kids" },
  { title: "Artes Marciais", slug: "artes-marciais" },
  { title: "Desenho Animado", slug: "desenho-animado" },
  { title: "Doujinshi", slug: "doujinshi" },
  { title: "Escolar", slug: "escolar" },
  { title: "Harém", slug: "harem" },
  { title: "Isekai", slug: "isekai" },
  { title: "Paranormal", slug: "paranormal" },
];

router.get('/home/categories/slug/:slug', (req, res) => {
  const { slug } = req.params;
  const category = categories.find(cat => cat.slug === slug);

  if (category) {
    res.json({ title: category.title });
  } else {
    res.status(404).json({ error: 'Categoria não encontrada' });
  }
});

module.exports = router;
