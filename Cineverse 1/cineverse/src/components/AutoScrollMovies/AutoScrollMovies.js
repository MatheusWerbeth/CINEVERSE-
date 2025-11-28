import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './AutoScrollMovies.css';

class AutoScrollMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      isPaused: false
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.startAutoScroll();
  }

  componentWillUnmount() {
    this.stopAutoScroll();
  }

  startAutoScroll = () => {
    this.scrollInterval = setInterval(() => {
      if (!this.state.isPaused) {
        this.scrollToNext();
      }
    }, 3000);
  };

  stopAutoScroll = () => {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  };

  scrollToNext = () => {
    const { movies } = this.props;
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex + 1) % movies.length
    }));
  };

  scrollToPrevious = () => {
    const { movies } = this.props;
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex === 0 ? movies.length - 1 : prevState.currentIndex - 1
    }));
  };

  handlePause = () => {
    this.setState({ isPaused: true });
  };

  handleResume = () => {
    this.setState({ isPaused: false });
  };

  render() {
    const { movies } = this.props;
    const { currentIndex, isPaused } = this.state;

    if (!movies || movies.length === 0) {
      return <div>Nenhum filme disponível</div>;
    }

    return (
      <div className="auto-scroll-movies">
        <div className="scroll-controls">
          <button onClick={this.scrollToPrevious}>◀</button>
          <button onClick={isPaused ? this.handleResume : this.handlePause}>
            {isPaused ? '▶' : '⏸'}
          </button>
          <button onClick={this.scrollToNext}>▶</button>
        </div>
        
        <div className="scroll-container" ref={this.scrollRef}>
          <MovieCard movie={movies[currentIndex]} />
        </div>
        
        <div className="scroll-indicator">
          {movies.map((_, index) => (
            <span
              key={index}
              className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => this.setState({ currentIndex: index })}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AutoScrollMovies;