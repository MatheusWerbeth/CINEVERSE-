import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://localhost:5002/api/favoritos';

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para testar a conexão
  const testarConexaoBackend = async () => {
    try {
      console.log('🔍 Testando conexão com backend...');
      const response = await fetch('http://localhost:5002/api/health');
      console.log('📡 Status do health check:', response.status);
      
      if (!response.ok) {
        throw new Error(`Health check falhou: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Backend respondendo:', data);
      return true;
    } catch (err) {
      console.error('❌ Backend não responde:', err.message);
      return false;
    }
  };

  // Carregar favoritos
  const carregarFavoritos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Iniciando carregamento de favoritos...');
      
      // Testar se o backend está respondendo
      const backendOk = await testarConexaoBackend();
      if (!backendOk) {
        throw new Error('Backend não está disponível. Verifique se o servidor está rodando na porta 5002.');
      }

      console.log('📡 Fazendo requisição para:', `${API_BASE}/listar`);
      
      const response = await fetch(`${API_BASE}/listar?usuario_id=1`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('📊 Status da resposta:', response.status);
      console.log('🔗 URL da resposta:', response.url);

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('📦 Dados recebidos:', result);

      if (result.success) {
        setFavoritos(result.data || []);
        console.log(`✅ ${result.data?.length || 0} favoritos carregados`);
      } else {
        throw new Error(result.message || 'Erro na resposta do servidor');
      }

    } catch (err) {
      console.error('💥 Erro ao carregar favoritos:', err);
      setError(err.message);
      setFavoritos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar/remover favorito
  const toggleFavorito = async (filmeId, titulo, dadosExtras = {}) => {
    try {
      setError(null);
      const isFavorito = favoritos.some(fav => fav.filme_id === parseInt(filmeId));
      const url = isFavorito ? `${API_BASE}/remover` : `${API_BASE}/adicionar`;
      
      console.log('🎯 Toggle favorito:');
      console.log('   📝 Filme ID:', filmeId);
      console.log('   🎬 Título:', titulo);
      console.log('   🔗 URL:', url);
      console.log('   ❓ É favorito?', isFavorito);

      // Preparar dados para enviar ao backend
      const requestBody = {
        filme_id: parseInt(filmeId),
        titulo: titulo,
        usuario_id: 1,
        // Se for ADICIONAR, enviar dados extras. Se for REMOVER, só enviar o básico
        ...(isFavorito ? {} : dadosExtras)
      };

      console.log('📦 Dados enviados para o backend:', requestBody);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📡 Status do toggle:', response.status);

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('📦 Resultado do toggle:', result);

      if (result.success) {
        console.log('✅ FAVORITO ATUALIZADO COM SUCESSO!');
        
        // Atualizar lista local
        if (isFavorito) {
          setFavoritos(prev => prev.filter(fav => fav.filme_id !== parseInt(filmeId)));
          console.log('🗑️ Favorito removido da lista local');
        } else {
          setFavoritos(prev => [...prev, result.data]);
          console.log('❤️ Favorito adicionado à lista local');
        }
        return true;
      } else {
        console.error('❌ Erro na resposta do servidor:', result.message);
        throw new Error(result.message || 'Erro ao atualizar favorito');
      }
    } catch (err) {
      console.error('💥 ERRO NO TOGGLE FAVORITO:', err);
      setError(err.message);
      return false;
    }
  };

  // Verificar se filme é favorito
  const isFavorito = useCallback((filmeId) => {
    const resultado = favoritos.some(fav => fav.filme_id === parseInt(filmeId));
    console.log(`🔍 Verificando se ${filmeId} é favorito:`, resultado);
    return resultado;
  }, [favoritos]);

  // Carregar favoritos ao inicializar
  useEffect(() => {
    console.log('🚀 Hook useFavoritos inicializado');
    carregarFavoritos();
  }, [carregarFavoritos]);

  return {
    favoritos,
    loading,
    error,
    toggleFavorito,
    isFavorito,
    recarregarFavoritos: carregarFavoritos,
    quantidade: favoritos.length
  };
};

export default useFavoritos;