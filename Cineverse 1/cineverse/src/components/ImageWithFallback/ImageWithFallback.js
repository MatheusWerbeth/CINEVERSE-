import React, { useState } from 'react';
import './ImageWithFallback.css';

const ImageWithFallback = ({ src, alt, className, fallbackText }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`image-fallback ${className}`}>
        <div className="fallback-content">
          <div className="fallback-icon">🎬</div>
          <span>{fallbackText || alt}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default ImageWithFallback;