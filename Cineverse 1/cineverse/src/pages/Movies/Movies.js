import React from 'react';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { horrorMovies } from '../../data/movies';
import './Movies.css';

const Movies = () => {
  const movies = horrorMovies.filter(item => item.type === 'movie');

  return (
    <div className="movies-page">
      <div className="page-header">
        <h2>Filmes de Terror</h2>
        <p>Os filmes mais aterrorizantes de todos os tempos</p>
      </div>
      <MovieGrid movies={movies} />
    </div>
  );
};

export default Movies;