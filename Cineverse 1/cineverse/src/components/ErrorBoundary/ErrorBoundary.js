import React, { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // VERIFICAÇÕES ANTES DE SETAR STATE
    const safeError = error || new Error('Erro desconhecido');
    const safeErrorInfo = errorInfo || { componentStack: 'Stack não disponível' };
    
    this.setState({
      error: safeError,
      errorInfo: safeErrorInfo
    });
    
    console.error('💥 ErrorBoundary capturou:', safeError);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // VERIFICAÇÕES EXTREMAS DE SEGURANÇA
      const errorMessage = this.state.error ? 
        (typeof this.state.error.toString === 'function' ? this.state.error.toString() : 'Erro sem mensagem') 
        : 'Erro desconhecido';
      
      const componentStack = this.state.errorInfo && this.state.errorInfo.componentStack ? 
        this.state.errorInfo.componentStack 
        : 'Stack trace não disponível';

      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>😰 Algo deu errado!</h2>
            <p>Ocorreu um erro inesperado no componente.</p>
            <details className="error-details">
              <summary>Detalhes do erro</summary>
              <pre>{errorMessage}</pre>
              <pre>{componentStack}</pre>
            </details>
            <div className="error-actions">
              <button onClick={this.handleRetry} className="retry-button">
                🔄 Tentar Novamente
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="reload-button"
              >
                🔃 Recarregar Página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;