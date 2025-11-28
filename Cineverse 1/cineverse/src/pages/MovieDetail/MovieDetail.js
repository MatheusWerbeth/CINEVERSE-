import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovie } from '../../hooks/useMovie';
import { useFavoritos } from '../../hooks/useFavoritos'; // ✅ CORRIGIDO
import { useTrailer } from '../../hooks/useTrailer';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import TrailerModal from '../../components/TrailerModal/TrailerModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const { movie, loading } = useMovie(id);
  const { isFavorito, toggleFavorito } = useFavoritos(); // ✅ CORRIGIDO
  const { isTrailerOpen, handleWatchTrailer, closeTrailer } = useTrailer();

const handleAddToFavorites = async () => {
  if (!movie) return;
  
  // Preparar dados extras completos do filme
  const dadosExtras = {
    ano: movie.year,
    diretor: movie.director,
    categoria: movie.category,
    duracao: movie.duration,
    imagem: movie.image,
    descricao: movie.description,
    tipo: movie.type,
    classificacao: movie.rating,
    trailer: movie.trailer
  };
  
  const sucesso = await toggleFavorito(movie.id, movie.title, dadosExtras);
  if (sucesso) {
    const message = isFavorito(movie.id) 
      ? `${movie.title} removido dos favoritos!` 
      : `${movie.title} adicionado aos favoritos!`;
    
    alert(message);
  } else {
    alert('Erro ao atualizar favoritos!');
  }
};

  // USE O LoadingSpinner DURANTE O CARREGAMENTO
  if (loading) {
    return (
      <div className="movie-loading">
        <LoadingSpinner message="Carregando filme" />
      </div>
    );
  }

  if (!movie) {
    return <div className="movie-not-found">Filme não encontrado!</div>;
  }

  return (
    <div className="movie-detail">
      <TrailerModal 
        trailerUrl={movie.trailer}
        isOpen={isTrailerOpen}
        onClose={closeTrailer}
      />
      
      <div className="movie-detail-header">
        <h1>{movie.title} ({movie.year})</h1>
        <div className="movie-type-badge">
          {movie.type === 'series' ? 'SÉRIE' : 'FILME'}
        </div>
      </div>
      
      <div className="movie-detail-content">
        <div className="movie-poster">
          <ImageWithFallback
            src={movie.image}
            alt={movie.title}
            className="movie-detail-image"
            fallbackText={`Poster de ${movie.title}`}
          />
        </div>
        
        <div className="movie-info">
          <div className="movie-meta">
            <p><strong>Diretor:</strong> {movie.director}</p>
            <p><strong>Duração:</strong> {movie.duration}</p>
            <p><strong>Categoria:</strong> {movie.category}</p>
            <p><strong>Classificação:</strong> ⭐ {movie.rating}/5.0</p>
            <p><strong>Trailer:</strong> {movie.trailer ? '✅ Disponível' : '❌ Indisponível'}</p>
          </div>
          
          <div className="movie-description">
            <h3>Sinopse</h3>
            <p>{movie.description}</p>
          </div>
          
          <div className="movie-actions">
            <button 
              className="btn-watch" 
              onClick={() => handleWatchTrailer(movie)}
              disabled={!movie.trailer}
            >
              🎬 {movie.trailer ? 'Assistir Trailer' : 'Trailer Indisponível'}
            </button>
            
            <button 
              className={isFavorito(movie.id) ? 'btn-favorite active' : 'btn-favorite'} // ✅ CORRIGIDO
              onClick={handleAddToFavorites}
            >
              {isFavorito(movie.id) ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'} {/* ✅ CORRIGIDO */}
            </button>
          </div>

          {movie.trailer && (
            <div className="trailer-info">
              <p><strong>Dica:</strong> Clique em "Assistir Trailer" para ver no player integrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;