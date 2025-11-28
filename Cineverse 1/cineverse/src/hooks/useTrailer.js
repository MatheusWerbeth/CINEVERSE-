import { useState } from 'react';

export const useTrailer = () => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const openTrailer = () => setIsTrailerOpen(true);
  const closeTrailer = () => setIsTrailerOpen(false);

  const handleWatchTrailer = (movie) => {
    if (movie && movie.trailer) {
      openTrailer();
    } else {
      alert('Trailer não disponível para este filme/série.');
    }
  };

  return {
    isTrailerOpen,
    openTrailer,
    closeTrailer,
    handleWatchTrailer
  };
};