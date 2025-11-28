const express = require('express');
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getCategories
} = require('../controllers/moviesController');
const { auth, adminAuth } = require('../middleware/auth');
const { validateMovie } = require('../middleware/validation');

const router = express.Router();

// Rotas públicas
router.get('/', getAllMovies);
router.get('/categories', getCategories);
router.get('/:id', getMovieById);

// Rotas protegidas (apenas admin)
router.post('/', auth, adminAuth, validateMovie, createMovie);
router.put('/:id', auth, adminAuth, validateMovie, updateMovie);
router.delete('/:id', auth, adminAuth, deleteMovie);

module.exports = router;