import React from 'react';
import './TrailerModal.css';

const TrailerModal = ({ trailerUrl, isOpen, onClose }) => {
  if (!isOpen || !trailerUrl) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        
        <div className="video-container">
          <iframe
            src={trailerUrl}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;