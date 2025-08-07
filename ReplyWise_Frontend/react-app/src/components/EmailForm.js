import React, { useState, useEffect } from 'react';

const EmailForm = ({ 
  emailContent, 
  setEmailContent, 
  selectedTone, 
  setSelectedTone, 
  isGenerating, 
  onSubmit, 
  emailContentRef 
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState('auto');

  // Auto-resize textarea
  useEffect(() => {
    if (emailContentRef.current) {
      emailContentRef.current.style.height = 'auto';
      const newHeight = Math.min(emailContentRef.current.scrollHeight, 180);
      setTextareaHeight(newHeight + 'px');
    }
  }, [emailContent]);

  const handleTextareaChange = (e) => {
    setEmailContent(e.target.value);
    setIsTyping(true);
    
    // Clear typing indicator after 1 second
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleToneChange = (e) => {
    setSelectedTone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Content Field */}
      <div className="form-group">
        <label htmlFor="emailContent" className="modern-label flex items-center justify-between mb-2">
          <span className="label-text text-white font-medium">Email Content</span>
          <span className="label-icon">📧</span>
        </label>
        <div className="input-container relative">
          <textarea
            ref={emailContentRef}
            id="emailContent"
            value={emailContent}
            onChange={handleTextareaChange}
            placeholder="Paste the email you received here..."
            rows="4"
            required
            className={`modern-textarea w-full ${isTyping ? 'typing' : ''}`}
            style={{ height: textareaHeight }}
            disabled={isGenerating}
          />
          <div className="input-glow absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-200"></div>
        </div>
        <div className="privacy-note flex items-center space-x-2 mt-2 text-xs text-white/50">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Your text is never stored</span>
        </div>
      </div>

      {/* Tone Selection Field */}
      <div className="form-group">
        <label htmlFor="toneSelect" className="modern-label flex items-center justify-between mb-2">
          <span className="label-text text-white font-medium">Response Tone</span>
          <span className="label-icon">🎯</span>
        </label>
        <div className="select-container relative">
          <select
            id="toneSelect"
            value={selectedTone}
            onChange={handleToneChange}
            required
            className="modern-select w-full pr-10"
            disabled={isGenerating}
          >
            <option value="">Choose your tone...</option>
            <option value="professional">💼 Professional</option>
            <option value="friendly">😊 Friendly</option>
            <option value="apologetic">🙏 Apologetic</option>
            <option value="enthusiastic">🚀 Enthusiastic</option>
            <option value="formal">🎩 Formal</option>
            <option value="casual">😎 Casual</option>
          </select>
          <div className="select-arrow absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="input-glow absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-200"></div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isGenerating}
        className="modern-button w-full flex items-center justify-center space-x-2"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Generate Response</span>
          </>
        )}
      </button>
    </form>
  );
};

export default EmailForm; 