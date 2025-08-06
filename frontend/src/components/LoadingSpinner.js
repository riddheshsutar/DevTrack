import React from 'react';
import { Loader2 } from 'lucide-react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading tasks...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <Loader2 className="spinner" size={40} />
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 