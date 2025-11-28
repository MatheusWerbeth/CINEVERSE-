import React from 'react';
import { useFavoritos } from '../../hooks/useFavoritos';
import { horrorMovies } from '../../data/movies'; // Importe seus filmes
import MovieCard from '../../components/MovieCard/MovieCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Favorites.css';

const Favorites = () => {
  const { favoritos, loading, quantidade } = useFavoritos();

  // Função para buscar informações completas do filme
  const getMovieDetails = (favorito) => {
    // Primeiro tenta encontrar o filme completo na lista original
    const filmeCompleto = horrorMovies.find(movie => 
      movie.id === favorito.filme_id || movie.id.toString() === favorito.filme_id.toString()
    );

    if (filmeCompleto) {
      return filmeCompleto;
    }

    // Se não encontrar, usa os dados salvos no favorito
    return {
      id: favorito.filme_id,
      title: favorito.titulo,
      year: favorito.ano || favorito.year || '',
      director: favorito.diretor || favorito.director || 'Diretor não informado',
      category: favorito.categoria || favorito.category || 'Categoria não informada',
      duration: favorito.duracao || favorito.duration || 'Duração não informada',
      rating: favorito.classificacao || favorito.rating || 0,
      description: favorito.descricao || favorito.description || 'Descrição não disponível.',
      image: favorito.imagem || favorito.image || favorito.poster || '',
      type: favorito.tipo || favorito.type || 'movie',
      poster: favorito.imagem || favorito.image || favorito.poster || '',
      trailer: favorito.trailer || ''
    };
  };

  if (loading) {
    return <LoadingSpinner message="Carregando seus filmes favoritos..." />;
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>🎬 Meus Favoritos</h1>
        <div className="favorites-count">
          {quantidade} {quantidade === 1 ? 'filme' : 'filmes'} favoritado{quantidade !== 1 ? 's' : ''}
        </div>
      </div>

      {quantidade === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">🤍</div>
          <h2>Nenhum filme favorito ainda</h2>
          <p>Explore nosso catálogo e adicione filmes aos seus favoritos!</p>
          <button 
            className="btn-explorar"
            onClick={() => window.location.href = '/movies'}
          >
            Explorar Filmes
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favoritos.map(favorito => {
            const movieData = getMovieDetails(favorito);
            console.log('📊 Dados do filme para MovieCard:', movieData); // Debug
            return (
              <MovieCard
                key={favorito.id || favorito.filme_id}
                movie={movieData}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;