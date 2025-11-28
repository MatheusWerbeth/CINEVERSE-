import React, { Component } from 'react';
import './LoadingSpinner.css';

class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dots: '.'
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        dots: prevState.dots.length >= 3 ? '.' : prevState.dots + '.'
      }));
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { message = 'Carregando' } = this.props;
    const { dots } = this.state;

    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p className="loading-text">
          {message}{dots}
        </p>
      </div>
    );
  }
}

export default LoadingSpinner;