const express = require('express');
const router = express.Router();
const Favorito = require('../models/Favorito');

// Health check específico para favoritos
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: '✅ API de Favoritos funcionando corretamente',
    timestamp: new Date().toISOString(),
    endpoints: {
      adicionar: 'POST /adicionar',
      remover: 'POST /remover',
      listar: 'GET /listar',
      verificar: 'GET /verificar/:filme_id',
      estatisticas: 'GET /estatisticas',
      testeModelo: 'GET /teste-modelo'
    }
  });
});

// Teste do modelo Favorito
router.get('/teste-modelo', async (req, res) => {
  try {
    console.log('🧪 Testando modelo Favorito...');
    
    // Testar métodos básicos
    console.log('🔍 Métodos disponíveis:');
    console.log('   - findOne:', typeof Favorito.findOne);
    console.log('   - create:', typeof Favorito.create);
    console.log('   - findAll:', typeof Favorito.findAll);
    console.log('   - count:', typeof Favorito.count);
    
    // Testar contagem
    const count = await Favorito.count();
    console.log('📊 Total de favoritos:', count);
    
    // Testar busca
    const favoritos = await Favorito.findAll({ limit: 3 });
    console.log('📝 Primeiros favoritos:', favoritos.map(f => f.toJSON()));
    
    res.json({
      success: true,
      message: 'Modelo Favorito está funcionando',
      methods: {
        findOne: typeof Favorito.findOne === 'function',
        create: typeof Favorito.create === 'function',
        findAll: typeof Favorito.findAll === 'function',
        count: typeof Favorito.count === 'function'
      },
      totalFavoritos: count,
      amostraFavoritos: favoritos.map(f => f.toJSON())
    });
    
  } catch (error) {
    console.error('❌ Erro no teste do modelo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no modelo: ' + error.message,
      error: error.stack
    });
  }
});

// Verificar status do banco
router.get('/status-banco', async (req, res) => {
  try {
    console.log('🔍 Verificando status do banco...');
    
    const { sequelize } = require('../config/database');
    
    // Testar conexão
    await sequelize.authenticate();
    console.log('✅ Conexão com banco: OK');
    
    // Verificar se tabela existe
    const tabelaExiste = await sequelize.getQueryInterface().showAllTables();
    console.log('📊 Tabelas existentes:', tabelaExiste);
    
    // Contar favoritos
    const totalFavoritos = await Favorito.count();
    console.log('🎬 Total de favoritos:', totalFavoritos);
    
    res.json({
      success: true,
      database: {
        connected: true,
        tables: tabelaExiste,
        totalFavoritos: totalFavoritos
      }
    });

  } catch (error) {
    console.error('❌ Erro no status do banco:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no banco: ' + error.message
    });
  }
});

// Endpoint de teste simples
router.post('/teste-simples', async (req, res) => {
  try {
    console.log('🧪 TESTE SIMPLES - Corpo:', req.body);
    
    // Criar um favorito com dados mínimos
    const favoritoTeste = await Favorito.create({
      filme_id: 9999, // ID que provavelmente não existe
      titulo: 'Filme de Teste',
      usuario_id: 1
    });

    console.log('✅ Teste bem-sucedido:', favoritoTeste.toJSON());

    // Limpar o teste
    await Favorito.destroy({
      where: { filme_id: 9999 }
    });

    res.json({
      success: true,
      message: 'Teste realizado com sucesso',
      data: favoritoTeste.toFrontendFormat()
    });

  } catch (error) {
    console.error('❌ ERRO NO TESTE:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no teste: ' + error.message,
      error: error.name
    });
  }
});

// Rota para debug - listar todos os favoritos com detalhes
router.get('/debug-todos', async (req, res) => {
  try {
    const favoritos = await Favorito.findAll({
      order: [['data_adicionado', 'DESC']]
    });

    console.log('🔍 TODOS OS FAVORITOS NO BANCO:');
    favoritos.forEach(fav => {
      console.log('📝', fav.toJSON());
    });

    res.json({
      success: true,
      total: favoritos.length,
      data: favoritos.map(fav => fav.toJSON())
    });

  } catch (error) {
    console.error('❌ Erro no debug:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Adicionar filme aos favoritos (versão com dados completos)
router.post('/adicionar', async (req, res) => {
  try {
    console.log('🎯 ========== INICIANDO ADIÇÃO DE FAVORITO ==========');
    console.log('📥 CORPO DA REQUISIÇÃO COMPLETO:', JSON.stringify(req.body, null, 2));
    
    const { 
      filme_id, 
      titulo, 
      usuario_id = 1,
      ano, diretor, categoria, duracao, imagem, descricao, tipo, classificacao, trailer
    } = req.body;

    // LOG DOS DADOS RECEBIDOS
    console.log('🔍 DADOS EXTRAÍDOS:', {
      filme_id,
      titulo,
      usuario_id,
      ano, 
      diretor, 
      categoria, 
      duracao, 
      imagem, 
      descricao, 
      tipo, 
      classificacao, 
      trailer
    });

    // VALIDAÇÃO BÁSICA
    if (!filme_id) {
      console.log('❌ ERRO: filme_id não fornecido');
      return res.status(400).json({
        success: false,
        message: 'ID do filme é obrigatório'
      });
    }

    if (!titulo) {
      console.log('❌ ERRO: titulo não fornecido');
      return res.status(400).json({
        success: false,
        message: 'Título do filme é obrigatório'
      });
    }

    // CONVERSÃO DE TIPOS
    const filmeIdNum = parseInt(filme_id);
    const usuarioIdNum = parseInt(usuario_id);

    console.log('🔢 IDs convertidos:', { filmeIdNum, usuarioIdNum });

    if (isNaN(filmeIdNum) || filmeIdNum <= 0) {
      console.log('❌ ERRO: filme_id inválido');
      return res.status(400).json({
        success: false,
        message: 'ID do filme deve ser um número válido'
      });
    }

    // VERIFICAR SE JÁ EXISTE
    console.log('🔍 Verificando se favorito já existe...');
    const favoritoExistente = await Favorito.findOne({
      where: { 
        filme_id: filmeIdNum, 
        usuario_id: usuarioIdNum 
      }
    });

    console.log('📊 Resultado da verificação:', {
      existe: !!favoritoExistente,
      dados: favoritoExistente ? favoritoExistente.toJSON() : 'NÃO EXISTE'
    });

    if (favoritoExistente) {
      console.log('⚠️ AVISO: Filme já é favorito');
      return res.status(400).json({
        success: false,
        message: 'Este filme já está nos seus favoritos',
        data: favoritoExistente.toFrontendFormat()
      });
    }

    // PREPARAR DADOS PARA CRIAÇÃO
    const dadosFavorito = {
      filme_id: filmeIdNum,
      titulo: titulo.trim(),
      ano: ano || null,
      diretor: diretor || 'Diretor não informado',
      categoria: categoria || 'Categoria não informada',
      duracao: duracao || 'Duração não informada',
      imagem: imagem || null,
      descricao: descricao || 'Descrição não disponível.',
      tipo: tipo || 'movie',
      classificacao: classificacao || 0,
      trailer: trailer || null,
      usuario_id: usuarioIdNum
    };

    console.log('📦 DADOS PARA CRIAÇÃO DO FAVORITO:', dadosFavorito);

    // CRIAR FAVORITO
    console.log('🔄 Criando favorito no banco...');
    const novoFavorito = await Favorito.create(dadosFavorito);

    console.log('✅ FAVORITO CRIADO COM SUCESSO:', novoFavorito.toJSON());

    res.json({
      success: true,
      message: `${titulo} adicionado aos favoritos`,
      data: novoFavorito.toFrontendFormat()
    });

    console.log('🎉 ========== FAVORITO ADICIONADO COM SUCESSO ==========');

  } catch (error) {
    console.error('💥 ========== ERRO CRÍTICO ==========');
    console.error('📛 Nome do erro:', error.name);
    console.error('📝 Mensagem:', error.message);
    console.error('🔧 Stack:', error.stack);
    
    if (error.parent) {
      console.error('👨‍💻 Erro parent:', {
        code: error.parent.code,
        detail: error.parent.detail,
        message: error.parent.message,
        sql: error.parent.sql
      });
    }
    
    if (error.original) {
      console.error('🔍 Erro original:', error.original);
    }

    // ERROS ESPECÍFICOS DO SEQUELIZE
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Este filme já está nos favoritos'
      });
    }

    if (error.name === 'SequelizeValidationError') {
      const erros = error.errors.map(err => ({
        campo: err.path,
        mensagem: err.message
      }));
      console.error('❌ Erros de validação:', erros);
      
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: erros
      });
    }

    if (error.name === 'SequelizeDatabaseError') {
      return res.status(500).json({
        success: false,
        message: 'Erro no banco de dados'
      });
    }

    // ERRO GENÉRICO
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor: ' + error.message,
      // Apenas em desenvolvimento
      ...(process.env.NODE_ENV === 'development' && {
        details: error.stack,
        errorName: error.name
      })
    });
  }
});

// Remover filme dos favoritos
router.post('/remover', async (req, res) => {
  try {
    console.log('📥 Recebendo requisição para remover favorito:', req.body);
    
    const { filme_id, usuario_id = 1 } = req.body;

    if (!filme_id) {
      console.log('❌ ID do filme não fornecido');
      return res.status(400).json({
        success: false,
        message: 'ID do filme é obrigatório'
      });
    }

    const filmeIdNum = parseInt(filme_id);
    const usuarioIdNum = parseInt(usuario_id);

    const resultado = await Favorito.destroy({
      where: { filme_id: filmeIdNum, usuario_id: usuarioIdNum }
    });

    console.log('🗑️ Resultado da remoção:', resultado);

    if (resultado === 0) {
      console.log('⚠️ Filme não encontrado nos favoritos');
      return res.status(404).json({
        success: false,
        message: 'Filme não encontrado nos favoritos'
      });
    }

    console.log('✅ Favorito removido com sucesso');
    res.json({
      success: true,
      message: 'Filme removido dos favoritos'
    });

  } catch (error) {
    console.error('❌ Erro ao remover favorito:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor: ' + error.message
    });
  }
});

// Listar favoritos do usuário
router.get('/listar', async (req, res) => {
  try {
    const { usuario_id = 1 } = req.query;
    
    console.log('📥 Listando favoritos para usuário:', usuario_id);

    // Usar o método que retorna dados formatados para frontend
    const favoritos = await Favorito.buscarComDadosCompletos(usuario_id);

    console.log(`✅ Encontrados ${favoritos.length} favoritos`);

    res.json({
      success: true,
      data: favoritos
    });

  } catch (error) {
    console.error('❌ Erro ao listar favoritos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor: ' + error.message
    });
  }
});

// Verificar se filme é favorito
router.get('/verificar/:filme_id', async (req, res) => {
  try {
    const { filme_id } = req.params;
    const { usuario_id = 1 } = req.query;

    console.log('🔍 Verificando se filme é favorito:', { filme_id, usuario_id });

    const filmeIdNum = parseInt(filme_id);
    const usuarioIdNum = parseInt(usuario_id);

    const favorito = await Favorito.findOne({
      where: { filme_id: filmeIdNum, usuario_id: usuarioIdNum }
    });

    const isFavorito = !!favorito;
    console.log(`✅ Filme ${filme_id} é favorito?`, isFavorito);

    res.json({
      success: true,
      isFavorito: isFavorito
    });

  } catch (error) {
    console.error('❌ Erro ao verificar favorito:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor: ' + error.message
    });
  }
});

// Rota para obter estatísticas dos favoritos
router.get('/estatisticas', async (req, res) => {
  try {
    const { usuario_id = 1 } = req.query;

    const totalFavoritos = await Favorito.count({
      where: { usuario_id: parseInt(usuario_id) }
    });

    const favoritosRecentes = await Favorito.findAll({
      where: { usuario_id: parseInt(usuario_id) },
      order: [['data_adicionado', 'DESC']],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        total: totalFavoritos,
        recentes: favoritosRecentes.map(fav => fav.toFrontendFormat())
      }
    });

  } catch (error) {
    console.error('❌ Erro ao obter estatísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor: ' + error.message
    });
  }
});

// Rota para limpar todos os favoritos (apenas para desenvolvimento)
router.delete('/limpar-todos', async (req, res) => {
  try {
    const { usuario_id = 1 } = req.body;
    
    console.log('🧹 Limpando todos os favoritos do usuário:', usuario_id);
    
    const usuarioIdNum = parseInt(usuario_id);

    const resultado = await Favorito.destroy({
      where: { usuario_id: usuarioIdNum }
    });

    console.log(`✅ ${resultado} favoritos removidos`);

    res.json({
      success: true,
      message: `${resultado} favoritos removidos`,
      removidos: resultado
    });

  } catch (error) {
    console.error('❌ Erro ao limpar favoritos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor: ' + error.message
    });
  }
});

// Reset completo da tabela (APENAS DESENVOLVIMENTO)
router.post('/reset-completo', async (req, res) => {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({
        success: false,
        message: 'Apenas em modo desenvolvimento'
      });
    }

    console.log('💥 INICIANDO RESET COMPLETO DA TABELA');
    
    // 1. Fazer backup dos dados atuais
    const favoritosAtuais = await Favorito.findAll();
    console.log('📦 Backup dos favoritos atuais:', favoritosAtuais.length);
    
    // 2. Deletar tabela
    await Favorito.drop();
    console.log('🗑️ Tabela deletada');
    
    // 3. Recriar tabela
    await Favorito.sync({ force: true });
    console.log('✅ Tabela recriada');
    
    // 4. Recriar alguns dados de teste
    const favoritoTeste = await Favorito.create({
      filme_id: 1,
      titulo: 'Filme Teste após Reset',
      usuario_id: 1
    });
    
    console.log('🎉 Reset completo realizado');

    res.json({
      success: true,
      message: 'Tabela resetada com sucesso',
      dadosAntigos: favoritosAtuais.length,
      dadosNovos: 1
    });

  } catch (error) {
    console.error('❌ Erro no reset:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no reset: ' + error.message
    });
  }
});

module.exports = router;