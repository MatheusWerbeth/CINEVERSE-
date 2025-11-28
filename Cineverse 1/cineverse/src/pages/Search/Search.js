import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { horrorMovies } from '../../data/movies';
import './Search.css';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const timerRef = useRef(null);

  const getSearchQuery = () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      return searchParams.get('q') || '';
    } catch (error) {
      console.error('❌ Erro ao extrair parâmetros da URL:', error);
      return '';
    }
  };

  const query = getSearchQuery();

  useEffect(() => {
    setMounted(true);
    
    return () => {
      setMounted(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // LIMPAR TIMER ANTERIOR
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query) {
      setLoading(true);
      
      // Simular busca com delay
      timerRef.current = setTimeout(() => {
        if (!mounted) return; 
        
        try {
          // BUSCA COM VERIFICAÇÕES DE SEGURANÇA
          const results = horrorMovies.filter(movie => {
            // VERIFICAR SE MOVIE É VÁLIDO
            if (!movie || !movie.title) return false;
            
            const queryLower = query.toLowerCase();
            
            return (
              (movie.title && movie.title.toLowerCase().includes(queryLower)) ||
              (movie.director && movie.director.toLowerCase().includes(queryLower)) ||
              (movie.category && movie.category.toLowerCase().includes(queryLower)) ||
              (movie.description && movie.description.toLowerCase().includes(queryLower))
            );
          });
          
          console.log(`🔍 Busca por "${query}": ${results.length} resultados`);
          
          // VERIFICAR SE COMPONENTE AINDA ESTÁ MONTADO ANTES DE ATUALIZAR STATE
          if (mounted) {
            setSearchResults(results || []);
            setLoading(false);
          }
        } catch (error) {
          console.error('💥 Erro durante a busca:', error);
          if (mounted) {
            setSearchResults([]);
            setLoading(false);
          }
        }
      }, 500);
    } else {
      if (mounted) {
        setSearchResults([]);
      }
    }

    // CLEANUP
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, mounted]);

  const safeSearchResults = Array.isArray(searchResults) ? searchResults : [];

  if (loading) {
    return (
      <div className="search-page">
        <div className="page-header">
          <h2>Buscando...</h2>
          <p>Procurando por: "{query}"</p>
        </div>
        <LoadingSpinner message="Procurando em nosso catálogo..." />
      </div>
    );
  }

  return (
    <div className="search-page">
      <div className="page-header">
        <h2>Resultados da Busca</h2>
        {query ? (
          <p>
            {safeSearchResults.length === 0 
              ? `Nenhum resultado encontrado para "${query}"`
              : `Encontrados ${safeSearchResults.length} resultados para "${query}"`
            }
          </p>
        ) : (
          <p>Digite algo na barra de busca para pesquisar</p>
        )}
      </div>

      {safeSearchResults.length > 0 && <MovieGrid movies={safeSearchResults} />}
      
      {query && safeSearchResults.length === 0 && !loading && (
        <div className="no-results">
          <h3>😕 Nenhum filme ou série encontrado</h3>
          <p>Tente buscar por termos diferentes como: título, diretor ou categoria</p>
          <div className="search-suggestions">
            <h4>Sugestões:</h4>
            <ul>
              <li>🔍 Verifique a ortografia</li>
              <li>🎬 Tente termos mais gerais</li>
              <li>🎥 Busque por diretor (ex: "Wes Craven")</li>
              <li>📁 Busque por categoria (ex: "Slasher")</li>
              <li>⭐ Tente títulos populares (ex: "O Iluminado")</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;