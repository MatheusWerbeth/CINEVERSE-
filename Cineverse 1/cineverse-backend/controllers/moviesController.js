const { Movie } = require('../models');
const { Op } = require('sequelize');

// Obter todos os filmes/séries
const getAllMovies = async (req, res) => {
  try {
    const { type, category, search, page = 1, limit = 12 } = req.query;
    
    // Construir where clause
    let where = { isActive: true };
    if (type) where.type = type;
    if (category) where.category = category;
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows: movies } = await Movie.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      movies,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao buscar filmes',
      error: error.message 
    });
  }
};

// Obter filme/série por ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Filme/série não encontrado' });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao buscar filme',
      error: error.message 
    });
  }
};

// Criar novo filme/série (apenas admin)
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      message: 'Filme/série criado com sucesso',
      movie
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao criar filme',
      error: error.message 
    });
  }
};

// Atualizar filme/série (apenas admin)
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Filme/série não encontrado' });
    }

    await movie.update(req.body);

    res.json({
      message: 'Filme/série atualizado com sucesso',
      movie
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao atualizar filme',
      error: error.message 
    });
  }
};

// Deletar filme/série (apenas admin)
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Filme/série não encontrado' });
    }

    await movie.update({ isActive: false });

    res.json({ message: 'Filme/série deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao deletar filme',
      error: error.message 
    });
  }
};

// Obter categorias
const getCategories = async (req, res) => {
  try {
    const categories = await Movie.findAll({
      attributes: ['category'],
      group: ['category'],
      where: { isActive: true },
      raw: true
    });

    const categoryNames = categories.map(cat => cat.category);
    
    res.json(categoryNames);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao buscar categorias',
      error: error.message 
    });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getCategories
};