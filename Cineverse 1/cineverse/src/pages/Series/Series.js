import React, { useState, useEffect } from 'react';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { horrorMovies } from '../../data/movies';
import './Series.css';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando busca de séries com loading
    const timer = setTimeout(() => {
      const filteredSeries = horrorMovies.filter(item => item.type === 'series');
      setSeries(filteredSeries);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="series-page">
        <div className="page-header">
          <h2>Séries de Terror</h2>
          <p>Carregando séries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="series-page">
      <div className="page-header">
        <h2>Séries de Terror</h2>
        <p>As séries mais assustadoras para maratonar ({series.length} {series.length === 1 ? 'série' : 'séries'})</p>
      </div>
      <MovieGrid movies={series} />
    </div>
  );
};

export default Series;