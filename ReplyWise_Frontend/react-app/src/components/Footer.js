import React from 'react';

const Footer = ({ status }) => {
  return (
    <footer className="modern-footer mt-6">
      <div className="status-container flex items-center justify-center space-x-2">
        <div className={`status-indicator ${status.type}`}></div>
        <span className="status text-sm text-white/70">{status.message}</span>
      </div>
    </footer>
  );
};

export default Footer; 