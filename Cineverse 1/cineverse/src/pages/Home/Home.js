import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import MovieCounter from '../../components/MovieCounter/MovieCounter';
import { horrorMovies } from '../../data/movies';
import './Home.css';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const moviesCount = horrorMovies.filter(item => item.type === 'movie').length;
  const seriesCount = horrorMovies.filter(item => item.type === 'series').length;

  useEffect(() => {
    setFeaturedMovies(horrorMovies.slice(0, 6));
  }, []);

  return (
    <div className="home">
      <div className="home-hero">
        <h2>Bem-vindo ao Cineverse</h2>
        <p>O universo do terror cinematográfico</p>
        <div className="hero-stats">
          <MovieCounter target={moviesCount} label="Filmes" theme="red" />
          <MovieCounter target={seriesCount} label="Séries" theme="blue" />
          <MovieCounter target={horrorMovies.length} label="Títulos" theme="green" />
        </div>
      </div>

      <div className="home-content">
        <div className="section-header">
          <h3>Destaques</h3>
          <Link to="/movies" className="see-all">Ver Todos →</Link>
        </div>
        <MovieGrid movies={featuredMovies} />
      </div>
    </div>
  );
};

export default Home;