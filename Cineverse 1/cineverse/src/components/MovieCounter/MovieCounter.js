import React, { Component } from 'react';
import './MovieCounter.css';

class MovieCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isAnimating: false
    };
  }

  componentDidMount() {
    this.startCounting();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.target !== this.props.target) {
      this.startCounting();
    }
  }

  startCounting = () => {
    const { target = 0, duration = 2000 } = this.props;
    
    this.setState({ isAnimating: true });
    
    const startTime = Date.now();
    const startValue = this.state.count;
    
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function para animação suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (target - startValue) * easeOutQuart);
      
      this.setState({ count: currentCount });
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        this.setState({ isAnimating: false });
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  render() {
    const { label, theme = 'default' } = this.props;
    const { count, isAnimating } = this.state;

    return (
      <div className={`movie-counter ${theme} ${isAnimating ? 'animating' : ''}`}>
        <div className="counter-number">{count}</div>
        <div className="counter-label">{label}</div>
      </div>
    );
  }
}

export default MovieCounter;