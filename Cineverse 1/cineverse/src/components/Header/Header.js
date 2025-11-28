import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Hook para navegação

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navega para a página de busca com o query
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          🎬 Cineverse
        </Link>

        {/* Menu de Navegação */}
        <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={isActiveLink('/') ? 'nav-link active' : 'nav-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <Link 
            to="/movies" 
            className={isActiveLink('/movies') ? 'nav-link active' : 'nav-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Filmes
          </Link>
          <Link 
            to="/series" 
            className={isActiveLink('/series') ? 'nav-link active' : 'nav-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Séries
          </Link>
          <Link 
            to="/categories" 
            className={isActiveLink('/categories') ? 'nav-link active' : 'nav-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Categorias
          </Link>
          <Link 
            to="/favorites" 
            className={isActiveLink('/favorites') ? 'nav-link active' : 'nav-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Favoritos
          </Link>
        </nav>

        {/* Barra de Pesquisa */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar filmes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>

        {/* Botão Menu Mobile */}
        <button 
          className="menu-toggle"
          onClick={toggleMenu}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Header;