import React, { useState } from 'react';

const Results = ({ results, onCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await onCopy();
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="results space-y-6 mt-6 animate-slide-up">
      {/* Email Summary Section */}
      <div className="result-section">
        <h3 className="result-title flex items-center space-x-2 text-white font-semibold mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Email Summary</span>
        </h3>
        <div className="output-box modern-output bg-dark-800/50 border border-white/10 rounded-xl p-4 text-white/90 text-sm leading-relaxed">
          {results.emailSummary}
        </div>
      </div>

      {/* Suggested Response Section */}
      <div className="result-section">
        <h3 className="result-title flex items-center space-x-2 text-white font-semibold mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Suggested Response</span>
        </h3>
        <div className="output-box modern-output bg-dark-800/50 border border-white/10 rounded-xl p-4 text-white/90 text-sm leading-relaxed mb-4">
          {results.emailResponse}
        </div>
        <button
          onClick={handleCopy}
          className={`copy-btn modern-copy-btn flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl transition-all duration-200 ${
            isCopied 
              ? 'bg-gradient-to-r from-green-600 to-green-700 transform scale-105' 
              : 'bg-dark-700 hover:bg-dark-600 text-white border border-white/20'
          }`}
        >
          {isCopied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Copy Response</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Results; 