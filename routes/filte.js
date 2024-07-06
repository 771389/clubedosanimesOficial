const express = require('express');
const router = express.Router();

const categories = [
    { title: "Ação", slug: "acao" },
    { title: "Aventura", slug: "aventura" },
    { title: "Comédia", slug: "comedia" },
    { title: "Drama", slug: "drama" },
    { title: "Fantasia", slug: "fantasia" },
    { title: "Horror", slug: "horror" },
    { title: "Mistério", slug: "misterio" },
    { title: "Romance", slug: "romance" },
    { title: "Ficção Científica", slug: "ficcao-cientifica" },
    { title: "Slice of Life", slug: "slice-of-life" },
    { title: "Sobrenatural", slug: "sobrenatural" },
    { title: "Esporte", slug: "esporte" },
    { title: "Musical", slug: "musical" },
    { title: "Histórico", slug: "historico" },
    { title: "Mecha", slug: "mecha" },
    { title: "Psicológico", slug: "psicologico" },
    { title: "Seinen", slug: "seinen" },
    { title: "Josei", slug: "josei" },
    { title: "Shoujo", slug: "shoujo" },
    { title: "Shounen", slug: "shounen" },
    { title: "Yaoi", slug: "yaoi" },
    { title: "Yuri", slug: "yuri" },
    { title: "Harem", slug: "harem" },
    { title: "Harem Reverso", slug: "harem-reverso" },
    { title: "Magia", slug: "magia" },
    { title: "Militar", slug: "militar" },
    { title: "Vampiros", slug: "vampiros" },
    { title: "Policial", slug: "policial" },
    { title: "Samurai", slug: "samurai" },
    { title: "Artes Marciais", slug: "artes-marciais" },
    { title: "Ecchi", slug: "ecchi" },
    { title: "Gore", slug: "gore" },
    { title: "Super Poderes", slug: "super-poderes" },
    { title: "Thriller", slug: "thriller" },
    { title: "Vida Escolar", slug: "vida-escolar" },
    { title: "Paródia", slug: "parodia" }
];

router.get('/categories/slug/:slug', (req, res) => {
  const { slug } = req.params;
  const category = categories.find(cat => cat.slug === slug);

  if (category) {
    res.json({ title: category.title });
  } else {
    res.status(404).json({ error: 'Categoria não encontrada' });
  }
});

module.exports = router;
