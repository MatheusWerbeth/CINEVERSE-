const { sequelize } = require('../config/database');

// Importar modelos
const Favorito = require('./Favorito');

// VERIFICAR se Favorito é uma instância válida
console.log('🔍 Inicializando modelos...');
console.log('🔍 Tipo do Favorito:', typeof Favorito);
console.log('🔍 Favorito tem findOne?', typeof Favorito.findOne);
console.log('🔍 Favorito tem create?', typeof Favorito.create);
console.log('🔍 Favorito tem findAll?', typeof Favorito.findAll);

// Exportar modelos
const db = {
  sequelize,
  Favorito
};

// Sincronizar modelos
async function syncModels() {
  try {
    console.log('🔄 Sincronizando tabela Favorito...');
    await db.Favorito.sync({ alter: true });
    console.log('✅ Tabela Favorito sincronizada com sucesso');
    
    // Verificar se a tabela foi criada
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('📊 Tabelas no banco:', tables);
    
  } catch (error) {
    console.error('❌ Erro ao sincronizar Favorito:', error);
  }
}

// Chamar a sincronização
syncModels();

module.exports = db;