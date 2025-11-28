const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1888,
      max: new Date().getFullYear() + 5
    }
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('movie', 'series'),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trailer: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'movies'
});

// Métodos estáticos
Movie.findByType = function(type) {
  return this.findAll({ where: { type, isActive: true } });
};

Movie.findByCategory = function(category) {
  return this.findAll({ where: { category, isActive: true } });
};

Movie.getCategories = function() {
  return this.findAll({
    attributes: ['category'],
    group: ['category'],
    where: { isActive: true }
  });
};

module.exports = Movie;