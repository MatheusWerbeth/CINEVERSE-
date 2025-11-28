const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Favorito = sequelize.define('Favorito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  filme_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'ID do filme é obrigatório'
      },
      min: 1
    }
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Título do filme é obrigatório'
      },
      notEmpty: {
        msg: 'Título do filme não pode ser vazio'
      }
    }
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1900,
      max: new Date().getFullYear() + 5
    }
  },
  diretor: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Diretor não informado'
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Categoria não informada'
  },
  duracao: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Duração não informada'
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'A imagem deve ser uma URL válida'
      }
    }
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Descrição não disponível.'
  },
  tipo: {
    type: DataTypes.ENUM('movie', 'series'),
    allowNull: false,
    defaultValue: 'movie'
  },
  classificacao: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  trailer: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'O trailer deve ser uma URL válida'
      }
    }
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'favoritos',
  timestamps: true,
  createdAt: 'data_adicionado',
  updatedAt: false,
  indexes: [
    {
      fields: ['filme_id', 'usuario_id'],
      name: 'idx_filme_usuario'
    }
  ],
  hooks: {
    beforeCreate: (favorito, options) => {
      // Garantir que o título tenha a primeira letra maiúscula
      if (favorito.titulo) {
        favorito.titulo = favorito.titulo.charAt(0).toUpperCase() + favorito.titulo.slice(1);
      }
      
      // Garantir que filme_id seja número
      if (favorito.filme_id) {
        favorito.filme_id = parseInt(favorito.filme_id);
      }
      
      // Garantir que usuario_id seja número
      if (favorito.usuario_id) {
        favorito.usuario_id = parseInt(favorito.usuario_id);
      }
    },
    beforeUpdate: (favorito, options) => {
      // Garantir que o título tenha a primeira letra maiúscula
      if (favorito.titulo && favorito.changed('titulo')) {
        favorito.titulo = favorito.titulo.charAt(0).toUpperCase() + favorito.titulo.slice(1);
      }
    }
  }
});

// Método estático para verificar se é favorito
Favorito.isFavorito = async function(filmeId, usuarioId = 1) {
  const filmeIdNum = parseInt(filmeId);
  const usuarioIdNum = parseInt(usuarioId);
  
  const favorito = await this.findOne({
    where: { 
      filme_id: filmeIdNum, 
      usuario_id: usuarioIdNum 
    }
  });
  return !!favorito;
};

// Método estático para obter favoritos do usuário
Favorito.getFavoritosUsuario = async function(usuarioId = 1) {
  const usuarioIdNum = parseInt(usuarioId);
  
  return await this.findAll({
    where: { usuario_id: usuarioIdNum },
    order: [['data_adicionado', 'DESC']]
  });
};

// Método estático para adicionar favorito com dados completos
Favorito.adicionarCompleto = async function(dadosFilme, usuarioId = 1) {
  const { 
    id, 
    title, 
    year, 
    director, 
    category, 
    duration, 
    image, 
    description, 
    type, 
    rating,
    trailer 
  } = dadosFilme;

  const filmeIdNum = parseInt(id);
  const usuarioIdNum = parseInt(usuarioId);

  // Verificar se já é favorito
  const favoritoExistente = await this.findOne({
    where: { 
      filme_id: filmeIdNum, 
      usuario_id: usuarioIdNum 
    }
  });

  if (favoritoExistente) {
    throw new Error('Filme já está nos favoritos');
  }

  // Criar novo favorito com dados completos
  return await this.create({
    filme_id: filmeIdNum,
    titulo: title,
    ano: year,
    diretor: director,
    categoria: category,
    duracao: duration,
    imagem: image,
    descricao: description,
    tipo: type,
    classificacao: rating,
    trailer: trailer,
    usuario_id: usuarioIdNum
  });
};

// Método de instância para obter dados formatados para o frontend
Favorito.prototype.toFrontendFormat = function() {
  return {
    id: this.id,
    filme_id: this.filme_id,
    titulo: this.titulo,
    title: this.titulo,
    year: this.ano,
    ano: this.ano,
    director: this.diretor,
    diretor: this.diretor,
    category: this.categoria,
    categoria: this.categoria,
    duration: this.duracao,
    duracao: this.duracao,
    image: this.imagem,
    imagem: this.imagem,
    description: this.descricao,
    descricao: this.descricao,
    type: this.tipo,
    tipo: this.tipo,
    rating: this.classificacao,
    classificacao: this.classificacao,
    trailer: this.trailer,
    data_adicionado: this.data_adicionado,
    usuario_id: this.usuario_id
  };
};

// Método estático para buscar favoritos com dados completos
Favorito.buscarComDadosCompletos = async function(usuarioId = 1) {
  const usuarioIdNum = parseInt(usuarioId);
  
  const favoritos = await this.findAll({
    where: { usuario_id: usuarioIdNum },
    order: [['data_adicionado', 'DESC']]
  });

  return favoritos.map(favorito => favorito.toFrontendFormat());
};

// Método para limpar todos os favoritos do usuário
Favorito.limparTodos = async function(usuarioId = 1) {
  const usuarioIdNum = parseInt(usuarioId);
  
  return await this.destroy({
    where: { usuario_id: usuarioIdNum }
  });
};

// Método para contar favoritos do usuário
Favorito.contarPorUsuario = async function(usuarioId = 1) {
  const usuarioIdNum = parseInt(usuarioId);
  
  return await this.count({
    where: { usuario_id: usuarioIdNum }
  });
};

// Método para obter favoritos recentes
Favorito.obterRecentes = async function(usuarioId = 1, limite = 5) {
  const usuarioIdNum = parseInt(usuarioId);
  
  const favoritos = await this.findAll({
    where: { usuario_id: usuarioIdNum },
    order: [['data_adicionado', 'DESC']],
    limit: limite
  });

  return favoritos.map(favorito => favorito.toFrontendFormat());
};

console.log('✅ Modelo Favorito carregado com sucesso');

module.exports = Favorito;