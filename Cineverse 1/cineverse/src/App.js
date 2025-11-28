import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Categories from './pages/Categories/Categories';
import Favorites from './pages/Favorites/Favorites';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Search from './pages/Search/Search';
import Footer from './components/Footer/Footer';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ClassicMovieCard from './components/ClassicMovieCard/ClassicMovieCard';
import MovieCounter from './components/MovieCounter/MovieCounter';
import AutoScrollMovies from './components/AutoScrollMovies/AutoScrollMovies';

import { horrorMovies } from './data/movies'; 
import './App.css';

function App() {
  return (
    <Router>
      {/* ENVOLVA TUDO NO ErrorBoundary */}
      <ErrorBoundary>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/search" element={<Search />} />
              
              {/* ROTA DE EXEMPLO PARA TESTAR OS COMPONENTES */}
              <Route 
                path="/test-components" 
                element={
                  <div className="test-components-page">
                    <h1>Teste dos Componentes de Classe</h1>
                    
                    {/* LoadingSpinner */}
                    <section>
                      <h2>Loading Spinner</h2>
                      <LoadingSpinner message="Carregando filmes de terror" />
                    </section>
                    
                    {/* MovieCounter */}
                    <section>
                      <h2>Contadores Animados</h2>
                      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <MovieCounter target={50} label="Filmes de Terror" theme="red" />
                        <MovieCounter target={25} label="Séries Assustadoras" theme="blue" />
                        <MovieCounter target={75} label="Total de Títulos" theme="green" />
                      </div>
                    </section>
                    
                    {/* ClassicMovieCard */}
                    <section>
                      <h2>Cartão Clássico de Filme</h2>
                      <div style={{ maxWidth: '300px' }}>
                        <ClassicMovieCard movie={horrorMovies[0]} />
                      </div>
                    </section>
                    
                    {/* AutoScrollMovies */}
                    <section>
                      <h2>Scroll Automático de Filmes</h2>
                      <AutoScrollMovies movies={horrorMovies.slice(0, 5)} />
                    </section>
                  </div>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;