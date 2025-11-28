import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ movies }) => {
  // VERIFICAÇÃO CRÍTICA DE SEGURANÇA
  if (!movies || !Array.isArray(movies)) {
    console.warn('⚠️ MovieGrid recebeu movies inválido:', movies);
    return (
      <div className="movie-grid-error">
        <p>❌ Erro ao carregar filmes</p>
      </div>
    );
  }

  // FILTRAR APENAS MOVIES VÁLIDOS
  const validMovies = movies.filter(movie => 
    movie && 
    typeof movie === 'object' && 
    movie.id && 
    movie.title
  );

  if (validMovies.length === 0) {
    return (
      <div className="movie-grid-empty">
        <p>Nenhum filme para exibir</p>
      </div>
    );
  }

  return (
    <div className="movies-grid">
      {validMovies.map(movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie}
        />
      ))}
    </div>
  );
};

export default MovieGrid;