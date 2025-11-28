import React, { useState } from 'react';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { horrorMovies } from '../../data/movies';
import './Categories.css';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const categories = ['Todos', ...new Set(horrorMovies.map(item => item.category))];
  
  const filteredMovies = selectedCategory === 'Todos' 
    ? horrorMovies 
    : horrorMovies.filter(item => item.category === selectedCategory);

  return (
    <div className="categories-page">
      <div className="page-header">
        <h2>Categorias</h2>
        <p>Explore por tipo de terror</p>
      </div>
      
      <div className="categories-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <MovieGrid movies={filteredMovies} />
    </div>
  );
};

export default Categories;