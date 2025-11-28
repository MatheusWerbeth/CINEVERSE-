import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            🎬 Cineverse
          </Link>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Início
            </Link>
            <Link to="/movies" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Filmes
            </Link>
            <Link to="/series" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Séries
            </Link>
            <Link to="/categories" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Categorias
            </Link>
            <Link to="/favorites" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Favoritos
            </Link>
          </div>

          <div 
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
      <SearchBar />
    </>
  );
};

export default Navigation;