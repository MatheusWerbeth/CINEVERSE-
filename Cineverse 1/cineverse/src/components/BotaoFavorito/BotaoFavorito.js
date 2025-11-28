import React, { useState } from 'react';
import { useFavoritos } from '../../hooks/useFavoritos';
import './BotaoFavorito.css';

const BotaoFavorito = ({ filmeId, titulo, tamanho = 'medio', movieData = null }) => {
  const { isFavorito, toggleFavorito } = useFavoritos();
  const [processando, setProcessando] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (processando) return;
    
    setProcessando(true);
    
    // Preparar dados extras COMPLETOS
    const dadosExtras = movieData ? {
      // Mapear para nomes consistentes (português/inglês)
      ano: movieData.year || movieData.ano || '',
      diretor: movieData.director || movieData.diretor || '',
      categoria: movieData.category || movieData.categoria || '',
      duracao: movieData.duration || movieData.duracao || '',
      imagem: movieData.image || movieData.imagem || movieData.poster || '',
      descricao: movieData.description || movieData.descricao || '',
      tipo: movieData.type || movieData.tipo || 'movie',
      classificacao: movieData.rating || movieData.classificacao || 0,
      trailer: movieData.trailer || '',
      
      // Salvar também em inglês para compatibilidade
      year: movieData.year || movieData.ano || '',
      director: movieData.director || movieData.diretor || '',
      category: movieData.category || movieData.categoria || '',
      duration: movieData.duration || movieData.duracao || '',
      image: movieData.image || movieData.imagem || movieData.poster || '',
      description: movieData.description || movieData.descricao || '',
      type: movieData.type || movieData.tipo || 'movie',
      rating: movieData.rating || movieData.classificacao || 0
    } : {};
    
    console.log('📤 Enviando dados extras para favorito:', dadosExtras); // Debug
    
    const sucesso = await toggleFavorito(filmeId, titulo, dadosExtras);
    setProcessando(false);
  };

  const favoritado = isFavorito(filmeId);

  return (
    <button
      className={`btn-favorito ${favoritado ? 'favoritado' : ''} ${tamanho} ${processando ? 'processando' : ''}`}
      onClick={handleClick}
      disabled={processando}
      title={favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {processando ? (
        '⏳'
      ) : favoritado ? (
        <>
          <span className="heart-icon">❤️</span>
          <span className="text">Remover</span>
        </>
      ) : (
        <>
          <span className="heart-icon">🤍</span>
          <span className="text">Favoritar</span>
        </>
      )}
    </button>
  );
};

export default BotaoFavorito;