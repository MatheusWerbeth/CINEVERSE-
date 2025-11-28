const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');

const app = express();

// ======================
// MIDDLEWARE - CORS CORRIGIDO
// ======================
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// ======================
// CONEXÃO COM BANCO
// ======================
testConnection();

// ======================
// ROTAS
// ======================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/favoritos', require('./routes/favoritos'));

// ======================
// ROTAS PÚBLICAS
// ======================

// Rota raiz - Página inicial da API
app.get('/', (req, res) => {
  res.json({ 
    message: '🎬 Bem-vindo à API do Cineverse!',
    version: '1.0.0',
    description: 'API para o site de filmes de terror Cineverse',
    status: 'Online 🟢',
    database: 'SQLite',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register', 
        profile: 'GET /api/auth/profile (autenticado)'
      },
      movies: {
        list_all: 'GET /api/movies',
        categories: 'GET /api/movies/categories',
        by_id: 'GET /api/movies/:id'
      },
      favoritos: {
        list: 'GET /api/favoritos/listar',
        add: 'POST /api/favoritos/adicionar',
        remove: 'POST /api/favoritos/remover',
        check: 'GET /api/favoritos/verificar/:movieId',
        health: 'GET /api/favoritos/health'
      },
      system: {
        health: 'GET /api/health'
      }
    }
  });
});

// Rota de saúde da API
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '✅ API Cineverse funcionando perfeitamente!',
    status: 'healthy 🟢',
    database: 'SQLite 🗄️',
    timestamp: new Date().toISOString(),
    cors: {
      allowed_origins: ['http://localhost:3000', 'http://localhost:3001'],
      allowed_methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }
  });
});

// ======================
// INICIALIZAÇÃO DO SERVIDOR
// ======================

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log('='.repeat(50));
    console.log('🎬 CINEVERSE BACKEND - INICIADO COM SUCESSO!');
    console.log('='.repeat(50));
    console.log(`🚀 Servidor rodando na porta: ${port}`);
    console.log(`📡 URL: http://localhost:${port}`);
    console.log(`🗄️ Banco de dados: SQLite`);
    console.log(`🌐 CORS habilitado para: localhost:3000 e localhost:3001`);
    console.log('='.repeat(50));
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`❌ Porta ${port} está ocupada, tentando ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.log('💥 Erro no servidor:', err);
    }
  });

  return server;
};

// Iniciar servidor na porta do .env ou 5000, e tentar portas subsequentes se ocupada
const PORT = process.env.PORT || 5000;
startServer(PORT);