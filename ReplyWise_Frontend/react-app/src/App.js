import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import EmailForm from './components/EmailForm';
import Results from './components/Results';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from './components/Footer';
import { generateEmailResponse } from './utils/api';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({ message: 'Ready', type: 'ready' });
  const [isLoaded, setIsLoaded] = useState(false);

  const emailContentRef = useRef(null);

  useEffect(() => {
    // Initialize app with startup animation
    setTimeout(() => {
      setIsLoaded(true);
      emailContentRef.current?.focus();
    }, 100);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isGenerating) return;

    const content = emailContent.trim();
    const tone = selectedTone;

    // Validation
    if (!content || !tone) {
      setError('Please fill in all fields');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResults(null);
    setStatus({ message: 'Analyzing email...', type: 'analyzing' });

    try {
      const data = await generateEmailResponse(content, tone);
      setResults(data);
      setStatus({ message: 'Response generated successfully!', type: 'success' });
    } catch (error) {
      handleApiError(error);
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
      }, 300);
    }
  };

  const handleApiError = (error) => {
    let message = 'Something went wrong. Please try again.';
    let statusType = 'error';

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      message = 'Unable to connect to the server. Make sure your backend is running on http://localhost:8080';
    } else if (error.message.includes('Server error: 500')) {
      message = 'Server error occurred. Please check your backend logs.';
    } else if (error.message.includes('Server error: 404')) {
      message = 'API endpoint not found. Check if your backend is configured correctly.';
    } else if (error.message.includes('Invalid response format')) {
      message = 'Received unexpected response from server.';
    }

    setError(message);
    setStatus({ message: 'Error occurred', type: statusType });
  };

  const handleCopyResponse = async () => {
    if (!results?.emailResponse) return;

    try {
      await navigator.clipboard.writeText(results.emailResponse);
      setStatus({ message: 'Response copied to clipboard', type: 'success' });
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setError('Failed to copy to clipboard');
      setStatus({ message: 'Copy failed', type: 'error' });
    }
  };

  const handleRetry = () => {
    setError(null);
    setStatus({ message: 'Ready', type: 'ready' });
  };

  const handleClearForm = () => {
    if (emailContent || selectedTone) {
      if (window.confirm('Clear the form?')) {
        setEmailContent('');
        setSelectedTone('');
        setResults(null);
        setError(null);
        setStatus({ message: 'Form cleared', type: 'ready' });
        emailContentRef.current?.focus();
      }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + Enter to submit form
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isGenerating) {
          handleFormSubmit(e);
        }
      }

      // Escape to clear form or hide results/errors
      if (e.key === 'Escape') {
        if (results || error) {
          setResults(null);
          setError(null);
          setStatus({ message: 'Ready', type: 'ready' });
        } else {
          handleClearForm();
        }
      }

      // Ctrl/Cmd + K to focus on email content
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        emailContentRef.current?.focus();
        emailContentRef.current?.select();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isGenerating, results, error, emailContent, selectedTone]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 font-inter ${isLoaded ? 'loaded' : ''}`}>
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Header />
        
        <div className="glass-card p-6 mt-6">
          <EmailForm
            emailContent={emailContent}
            setEmailContent={setEmailContent}
            selectedTone={selectedTone}
            setSelectedTone={setSelectedTone}
            isGenerating={isGenerating}
            onSubmit={handleFormSubmit}
            emailContentRef={emailContentRef}
          />

          {results && (
            <Results
              results={results}
              onCopy={handleCopyResponse}
            />
          )}

          {error && (
            <ErrorDisplay
              error={error}
              onRetry={handleRetry}
            />
          )}
        </div>

        <Footer status={status} />
      </div>
    </div>
  );
}

export default App;
