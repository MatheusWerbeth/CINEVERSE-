const { Favorite, Movie } = require('../models');

// Obter favoritos do usuário
const getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Movie,
        where: { isActive: true }
      }],
      order: [['createdAt', 'DESC']]
    });

    const movies = favorites.map(fav => fav.Movie);

    res.json(movies);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao buscar favoritos',
      error: error.message 
    });
  }
};

// Adicionar aos favoritos
const addToFavorites = async (req, res) => {
  try {
    const { movieId } = req.body;

    // Verificar se o filme existe
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Filme/série não encontrado' });
    }

    // Verificar se já está nos favoritos
    const existingFavorite = await Favorite.findOne({
      where: {
        userId: req.user.id,
        movieId: movieId
      }
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Já está nos favoritos' });
    }

    // Adicionar aos favoritos
    const favorite = await Favorite.create({
      userId: req.user.id,
      movieId: movieId
    });

    res.status(201).json({
      message: 'Adicionado aos favoritos',
      movie
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao adicionar aos favoritos',
      error: error.message 
    });
  }
};

// Remover dos favoritos
const removeFromFavorites = async (req, res) => {
  try {
    const { movieId } = req.params;

    const favorite = await Favorite.findOne({
      where: {
        userId: req.user.id,
        movieId: movieId
      }
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Não encontrado nos favoritos' });
    }

    await favorite.destroy();

    res.json({ message: 'Removido dos favoritos' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao remover dos favoritos',
      error: error.message 
    });
  }
};

// Verificar se está nos favoritos
const checkIsFavorite = async (req, res) => {
  try {
    const { movieId } = req.params;

    const favorite = await Favorite.findOne({
      where: {
        userId: req.user.id,
        movieId: movieId
      }
    });

    res.json({ isFavorite: !!favorite });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao verificar favorito',
      error: error.message 
    });
  }
};

module.exports = {
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
  checkIsFavorite
};