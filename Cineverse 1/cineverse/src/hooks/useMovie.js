import { useState, useEffect } from 'react';
import { horrorMovies } from '../data/movies';

export const useMovie = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundMovie = horrorMovies.find(m => m.id === parseInt(movieId));
      setMovie(foundMovie);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [movieId]);

  return { movie, loading };
};