const { Sequelize } = require('sequelize');
const path = require('path');

// Configuração do Sequelize com opções para evitar lock
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database', 'cineverse.db'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  
  // Configurações de pool para conexões simultâneas
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    evict: 10000, 
    handleDisconnects: true
  },
  
  // Opções específicas do SQLite
  dialectOptions: {
    
  },
  
  // Configurações de retry para erros de lock
  retry: {
    max: 3,
    match: [
      /SQLITE_BUSY/,
      /database is locked/
    ],
    timeout: 3000
  },
  
  // Outras configurações
  transactionType: 'IMMEDIATE', // Para evitar deadlocks
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true
  }
});

// Função para verificar se o banco está bloqueado
const isDatabaseLocked = (error) => {
  return error && (
    error.message.includes('SQLITE_BUSY') ||
    error.message.includes('database is locked') ||
    error.code === 'SQLITE_BUSY'
  );
};

// Função de teste de conexão com tratamento de erros
const testConnection = async (retries = 3) => {
  try {
    console.log('🔗 Tentando conectar ao banco de dados...');
    
    await sequelize.authenticate();
    console.log('✅ Conexão com SQLite estabelecida com sucesso!');
    
    // Sincronizar modelos com tratamento de erro
    console.log('🔄 Sincronizando modelos...');
    await sequelize.sync({ 
      force: false, // ❌ 
      alter: true   // ✅ 
    });
    
    console.log('🗄️ Modelos sincronizados com sucesso!');
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error.message);
    
    // Se for erro de lock e ainda tiver tentativas
    if (isDatabaseLocked(error) && retries > 0) {
      console.log(`🔄 Banco bloqueado. Tentando novamente em 2 segundos... (${retries} tentativas restantes)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return testConnection(retries - 1);
    }
    
    // Se for outro erro ou acabaram as tentativas
    if (isDatabaseLocked(error)) {
      console.error('💥 Banco continuamente bloqueado. Verifique:');
      console.error('   • DB Browser for SQLite está fechado?');
      console.error('   • Outro processo está usando o banco?');
      console.error('   • O arquivo do banco tem permissões de escrita?');
    }
    
    return false;
  }
};


const executeQuery = async (query, options = {}) => {
  const maxRetries = options.retries || 3;
  const retryDelay = options.retryDelay || 1000;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await query();
    } catch (error) {
      if (isDatabaseLocked(error) && attempt < maxRetries) {
        console.log(`🔄 Query bloqueada. Tentativa ${attempt + 1}/${maxRetries} em ${retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }
      throw error;
    }
  }
};

// Exportar tudo
module.exports = { 
  sequelize, 
  testConnection,
  executeQuery,
  isDatabaseLocked
};