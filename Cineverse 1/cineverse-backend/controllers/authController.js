const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Registrar usuário
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar se usuário já existe
    const userExists = await User.findOne({ 
      where: { email } 
    });

    if (userExists) {
      return res.status(400).json({ 
        message: 'Email já está em uso' 
      });
    }

    const usernameExists = await User.findOne({
      where: { username }
    });

    if (usernameExists) {
      return res.status(400).json({
        message: 'Username já está em uso'
      });
    }

    
    const user = await User.create({
      username,
      email,
      password
    });

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao criar usuário',
      error: error.message 
    });
  }
};

// Login de usuário
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se usuário existe
    const user = await User.findOne({ where: { email } });

    if (user && (await user.correctPassword(password))) {
      res.json({
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token: generateToken(user.id)
      });
    } else {
      res.status(401).json({ 
        message: 'Email ou senha inválidos' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao fazer login',
      error: error.message 
    });
  }
};

// Obter perfil do usuário
const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao obter perfil',
      error: error.message 
    });
  }
};

module.exports = {
  register,
  login,
  getProfile
};