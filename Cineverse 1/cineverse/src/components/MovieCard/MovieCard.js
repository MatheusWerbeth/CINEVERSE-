import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import BotaoFavorito from '../BotaoFavorito/BotaoFavorito';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Valores padrão para evitar erros
  const safeMovie = {
    id: movie.id || 0,
    title: movie.title || 'Título não disponível',
    year: movie.year || '',
    director: movie.director || 'Diretor não informado',
    category: movie.category || 'Categoria não informada',
    duration: movie.duration || 'Duração não informada',
    rating: movie.rating || 0,
    description: movie.description || 'Descrição não disponível...',
    image: movie.image || movie.poster || movie.imagem || '',
    type: movie.type || 'movie'
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleFavoritoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link to={`/movie/${safeMovie.id}`} className="movie-card-link">
      <div 
        className={`movie-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="movie-badge">
          {safeMovie.type === 'series' ? 'SÉRIE' : 'FILME'}
        </div>
        
        <div className="movie-favorite-button">
          <div onClick={handleFavoritoClick}>
            <BotaoFavorito 
              filmeId={safeMovie.id} 
              titulo={safeMovie.title}
              tamanho="pequeno"
              movieData={safeMovie}
            />
          </div>
        </div>
        
        <div className="movie-image-container">
          <ImageWithFallback
            src={safeMovie.image}
            alt={safeMovie.title}
            className="movie-image"
            fallbackText={safeMovie.title}
          />
          {isHovered && (
            <div className="movie-overlay">
              <span className="watch-now">Ver Detalhes →</span>
            </div>
          )}
        </div>
        
        <div className="movie-info">
          <h3 className="movie-title">
            {safeMovie.title} {safeMovie.year && `(${safeMovie.year})`}
          </h3>
          <p className="movie-director">{safeMovie.director}</p>
          <div className="movie-meta">
            <span className="movie-category">{safeMovie.category}</span>
            <span className="movie-duration">{safeMovie.duration}</span>
          </div>
          <div className="movie-rating">
            ⭐ {safeMovie.rating}/5.0
          </div>
          <p className="movie-description">
            {isHovered 
              ? safeMovie.description 
              : `${safeMovie.description.substring(0, 80)}${safeMovie.description.length > 80 ? '...' : ''}`
            }
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;