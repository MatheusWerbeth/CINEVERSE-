const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Dados de entrada inválidos',
      errors: errors.array() 
    });
  }
  next();
};

// Validações para usuário
const validateUserRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username deve ter entre 3 e 30 caracteres'),
  body('email')
    .isEmail()
    .withMessage('Email deve ser válido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres'),
  handleValidationErrors
];

const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Email deve ser válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
  handleValidationErrors
];

// Validações para filmes
const validateMovie = [
  body('title')
    .notEmpty()
    .withMessage('Título é obrigatório'),
  body('year')
    .isInt({ min: 1888, max: new Date().getFullYear() + 5 })
    .withMessage('Ano deve ser válido'),
  body('director')
    .notEmpty()
    .withMessage('Diretor é obrigatório'),
  body('description')
    .isLength({ min: 10 })
    .withMessage('Descrição deve ter pelo menos 10 caracteres'),
  body('image')
    .isURL()
    .withMessage('Imagem deve ser uma URL válida'),
  body('trailer')
    .isURL()
    .withMessage('Trailer deve ser uma URL válida'),
  body('type')
    .isIn(['movie', 'series'])
    .withMessage('Tipo deve ser "movie" ou "series"'),
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateMovie
};