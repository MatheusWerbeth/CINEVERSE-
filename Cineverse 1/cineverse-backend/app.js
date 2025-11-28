const express = require('express');
const cors = require('cors');
const path = require('path');
const { testConnection } = require('./config/database');

// Importar modelos PRIMEIRO (para garantir a sincronização)
require('./models/Favorito');

// Importar rotas
const favoritosRoutes = require('./routes/favoritos');

const app = express();
const PORT = process.env.PORT || 5002;

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Log de requisições
app.use((req, res, next) => {
  console.log(`📍 ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Rotas
app.use('/api/favoritos', favoritosRoutes);

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    status: '✅ Backend funcionando!',
    timestamp: new Date().toISOString(),
    database: 'SQLite',
    port: PORT
  });
});

// Rota para verificar se a API está respondendo
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: '🎬 API CineVerse respondendo!',
    data: {
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }
  });
});

// Rota padrão
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: '🎬 CineVerse Backend API',
    endpoints: {
      health: 'GET /api/health',
      test: 'GET /api/test',
      favoritos: {
        adicionar: 'POST /api/favoritos/adicionar',
        remover: 'POST /api/favoritos/remover', 
        listar: 'GET /api/favoritos/listar',
        verificar: 'GET /api/favoritos/verificar/:filme_id',
        estatisticas: 'GET /api/favoritos/estatisticas',
        health: 'GET /api/favoritos/health'
      }
    }
  });
});

// Manipulador de erros
app.use((error, req, res, next) => {
  console.error('💥 Erro não tratado:', error);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Inicializar servidor
const startServer = async () => {
  try {
    console.log('==================================================');
    console.log('🎬 CINEVERSE BACKEND - INICIANDO...');
    console.log('==================================================');
    
    // Testar conexão com o banco
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Falha na conexão com o banco. Encerrando...');
      process.exit(1);
    }
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('==================================================');
      console.log(`🚀 Servidor rodando na porta: ${PORT}`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🗄️ Banco de dados: SQLite`);
      console.log(`🌐 CORS: http://localhost:3000`);
      console.log('==================================================');
    });
    
  } catch (error) {
    console.error('❌ Falha ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Iniciar aplicação
startServer();

module.exports = app;