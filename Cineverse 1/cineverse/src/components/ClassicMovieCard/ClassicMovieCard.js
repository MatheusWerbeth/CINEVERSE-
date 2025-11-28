import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ClassicMovieCard.css';

class ClassicMovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      isImageLoaded: false
    };
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  handleImageLoad = () => {
    this.setState({ isImageLoaded: true });
  };

  handleImageError = () => {
    this.setState({ isImageLoaded: false });
  };

  render() {
    const { movie } = this.props;
    const { isHovered, isImageLoaded } = this.state;

    return (
      <Link to={`/movie/${movie.id}`} className="classic-movie-card-link">
        <div 
          className={`classic-movie-card ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="classic-movie-badge">
            {movie.type === 'series' ? 'SÉRIE' : 'FILME'}
          </div>
          
          <div className="classic-movie-image-container">
            <img
              src={movie.image}
              alt={movie.title}
              className="classic-movie-image"
              onLoad={this.handleImageLoad}
              onError={this.handleImageError}
            />
            {!isImageLoaded && (
              <div className="classic-image-placeholder">
                🎬
              </div>
            )}
          </div>
          
          <div className="classic-movie-info">
            <h3 className="classic-movie-title">
              {movie.title} ({movie.year})
            </h3>
            <p className="classic-movie-director">{movie.director}</p>
            <div className="classic-movie-rating">
              ⭐ {movie.rating}/5.0
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default ClassicMovieCard;