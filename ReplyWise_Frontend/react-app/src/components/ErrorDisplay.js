import React from 'react';

const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="error mt-6 animate-error-appear">
      <div className="error-content bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-4">
        <div className="flex items-start space-x-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-400 mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <p className="text-red-100 text-sm leading-relaxed">{error}</p>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="retry-btn w-full bg-dark-700 hover:bg-dark-600 text-white py-3 px-4 rounded-xl transition-all duration-200 border border-white/20"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay; 