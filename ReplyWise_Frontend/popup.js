// DOM Elements
const emailForm = document.getElementById('emailForm');
const emailContent = document.getElementById('emailContent');
const toneSelect = document.getElementById('toneSelect');
const generateBtn = document.getElementById('generateBtn');
const btnText = document.getElementById('btnText');
const loader = document.getElementById('loader');
const results = document.getElementById('results');
const summaryOutput = document.getElementById('summaryOutput');
const responseOutput = document.getElementById('responseOutput');
const copyBtn = document.getElementById('copyBtn');
const errorDiv = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');
const status = document.getElementById('status');
const statusIndicator = document.querySelector('.status-indicator');

// Configuration
const API_URL = 'https://replywise-8zw4.onrender.com/api/openai';

// State management
let currentResponse = '';
let isGenerating = false;

// Event Listeners
emailForm.addEventListener('submit', handleFormSubmit);
copyBtn.addEventListener('click', copyToClipboard);
retryBtn.addEventListener('click', hideError);

// Enhanced auto-resize textarea with smooth animation
emailContent.addEventListener('input', function() {
    this.style.height = 'auto';
    const newHeight = Math.min(this.scrollHeight, 180); // Max height from CSS
    this.style.height = newHeight + 'px';

    // Add subtle animation class
    this.classList.add('expanding');
    setTimeout(() => {
        this.classList.remove('expanding');
    }, 200);
});

// Enhanced select interaction
toneSelect.addEventListener('change', function() {
    if (this.value) {
        this.style.color = 'white';
        // Add selection feedback
        this.classList.add('selected');
        setTimeout(() => {
            this.classList.remove('selected');
        }, 300);
    }
});

// Form submission handler with enhanced UX
async function handleFormSubmit(e) {
    e.preventDefault();

    if (isGenerating) return;

    const content = emailContent.value.trim();
    const tone = toneSelect.value;

    // Debug logging for form values
    console.log('=== FORM SUBMISSION DEBUG ===');
    console.log('Raw email content value:', emailContent.value);
    console.log('Trimmed content:', content);
    console.log('Selected tone value:', tone);

    // Enhanced validation with better UX
    if (!content || !tone) {
        console.error('Validation failed:');
        console.error('- Content empty:', !content);
        console.error('- Tone empty:', !tone);

        // Highlight missing fields
        if (!content) {
            emailContent.classList.add('error-shake');
            setTimeout(() => emailContent.classList.remove('error-shake'), 500);
        }
        if (!tone) {
            toneSelect.classList.add('error-shake');
            setTimeout(() => toneSelect.classList.remove('error-shake'), 500);
        }

        showError('Please fill in all fields');
        return;
    }

    console.log('Form validation passed, calling API...');
    await generateEmailResponse(content, tone);
}

// Main API call function with enhanced loading states
async function generateEmailResponse(content, tone) {
    isGenerating = true;
    setLoading(true);
    hideError();
    hideResults();
    updateStatus('Analyzing email...', 'analyzing');

    // Debug logging
    console.log('=== DEBUG INFO ===');
    console.log('Email content:', content);
    console.log('Selected tone:', tone);
    console.log('Content length:', content.length);

    const requestBody = {
        UserMessage: content,
        tone: tone
    };

    console.log('Request body:', requestBody);

    try {
        console.log('Making request to:', API_URL);

        // Update status during different phases
        setTimeout(() => {
            if (isGenerating) updateStatus('Generating response...', 'generating');
        }, 1000);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (!data.emailSummary || !data.emailResponse) {
            console.error('Invalid response structure:', data);
            throw new Error('Invalid response format from server');
        }

        // Add slight delay for better UX
        setTimeout(() => {
            displayResults(data.emailSummary, data.emailResponse);
            updateStatus('Response generated successfully!', 'success');
        }, 300);

    } catch (error) {
        console.error('Error generating response:', error);
        handleApiError(error);
    } finally {
        setTimeout(() => {
            setLoading(false);
            isGenerating = false;
        }, 300);
    }
}

// Enhanced error handling with better messaging
function handleApiError(error) {
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

    showError(message);
    updateStatus('Error occurred', statusType);
}

// Enhanced UI State Management
function setLoading(isLoading) {
    generateBtn.disabled = isLoading;

    if (isLoading) {
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
        generateBtn.classList.add('loading');

        // Add loading shimmer effect
        generateBtn.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
    } else {
        btnText.classList.remove('hidden');
        loader.classList.add('hidden');
        generateBtn.classList.remove('loading');

        // Reset button background
        generateBtn.style.background = '';
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');

    // Add error animation
    errorDiv.classList.add('error-appear');
    setTimeout(() => {
        errorDiv.classList.remove('error-appear');
    }, 500);
}

function hideError() {
    errorDiv.classList.add('hidden');
}

function showResults() {
    results.classList.remove('hidden');
}

function hideResults() {
    results.classList.add('hidden');
}

function displayResults(summary, response) {
    summaryOutput.textContent = summary;
    responseOutput.textContent = response;
    currentResponse = response;
    showResults();

    // Add success feedback
    results.classList.add('results-appear');
    setTimeout(() => {
        results.classList.remove('results-appear');
    }, 600);
}

// Enhanced status updates with visual indicators
function updateStatus(message, type = 'default') {
    status.textContent = message;

    // Update status indicator color based on type
    statusIndicator.className = 'status-indicator';
    statusIndicator.classList.add(`status-${type}`);

    // Auto-clear status after 3 seconds for non-error states
    if (type !== 'error') {
        setTimeout(() => {
            if (status.textContent === message) {
                updateStatus('Ready', 'ready');
            }
        }, 3000);
    }
}

// Enhanced copy to clipboard with better feedback
async function copyToClipboard() {
    if (!currentResponse) return;

    // Get the original button structure
    const originalIcon = copyBtn.querySelector('svg');
    const originalText = copyBtn.lastChild.textContent.trim();

    try {
        await navigator.clipboard.writeText(currentResponse);

        // Create success icon (checkmark)
        const successIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        successIcon.setAttribute('width', '14');
        successIcon.setAttribute('height', '14');
        successIcon.setAttribute('viewBox', '0 0 24 24');
        successIcon.setAttribute('fill', 'none');

        const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        checkPath.setAttribute('d', 'M20 6L9 17L4 12');
        checkPath.setAttribute('stroke', 'currentColor');
        checkPath.setAttribute('stroke-width', '2');
        checkPath.setAttribute('stroke-linecap', 'round');
        checkPath.setAttribute('stroke-linejoin', 'round');

        successIcon.appendChild(checkPath);

        // Replace icon and text
        copyBtn.replaceChild(successIcon, originalIcon);
        copyBtn.lastChild.textContent = ' Copied!';
        copyBtn.classList.add('copied');
        updateStatus('Response copied to clipboard', 'success');

        // Reset button after 2.5 seconds
        setTimeout(() => {
            copyBtn.replaceChild(originalIcon, copyBtn.querySelector('svg'));
            copyBtn.lastChild.textContent = ' ' + originalText;
            copyBtn.classList.remove('copied');
        }, 2500);

    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        fallbackCopyToClipboard(currentResponse, originalIcon, originalText);
    }
}

// Enhanced fallback copy method
function fallbackCopyToClipboard(text, originalIcon, originalText) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');

        // Create success icon (checkmark) for fallback
        const successIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        successIcon.setAttribute('width', '14');
        successIcon.setAttribute('height', '14');
        successIcon.setAttribute('viewBox', '0 0 24 24');
        successIcon.setAttribute('fill', 'none');

        const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        checkPath.setAttribute('d', 'M20 6L9 17L4 12');
        checkPath.setAttribute('stroke', 'currentColor');
        checkPath.setAttribute('stroke-width', '2');
        checkPath.setAttribute('stroke-linecap', 'round');
        checkPath.setAttribute('stroke-linejoin', 'round');

        successIcon.appendChild(checkPath);

        // Replace icon and text
        copyBtn.replaceChild(successIcon, copyBtn.querySelector('svg'));
        copyBtn.lastChild.textContent = ' Copied!';
        copyBtn.classList.add('copied');
        updateStatus('Response copied to clipboard', 'success');

        setTimeout(() => {
            copyBtn.replaceChild(originalIcon, copyBtn.querySelector('svg'));
            copyBtn.lastChild.textContent = ' ' + originalText;
            copyBtn.classList.remove('copied');
        }, 2500);
    } catch (error) {
        showError('Failed to copy to clipboard');
        updateStatus('Copy failed', 'error');
    } finally {
        document.body.removeChild(textArea);
    }
}

// Initialize app with enhanced startup
document.addEventListener('DOMContentLoaded', function() {
    updateStatus('Ready', 'ready');
    emailContent.focus();

    // Add startup animation delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Initialize form interactions
    initializeFormEnhancements();
});

// Enhanced form interactions
function initializeFormEnhancements() {
    // Add focus/blur animations
    const inputs = [emailContent, toneSelect];

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Add typing animation for textarea
    let typingTimer;
    emailContent.addEventListener('input', function() {
        this.classList.add('typing');
        clearTimeout(typingTimer);

        typingTimer = setTimeout(() => {
            this.classList.remove('typing');
        }, 1000);
    });
}

// Enhanced keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!generateBtn.disabled && !isGenerating) {
            // Add keyboard submit animation
            generateBtn.classList.add('keyboard-submit');
            setTimeout(() => {
                generateBtn.classList.remove('keyboard-submit');
                emailForm.dispatchEvent(new Event('submit'));
            }, 150);
        }
    }

    // Escape to clear form or hide results/errors
    if (e.key === 'Escape') {
        if (!results.classList.contains('hidden') || !errorDiv.classList.contains('hidden')) {
            hideResults();
            hideError();
            updateStatus('Ready', 'ready');
        } else if (emailContent.value || toneSelect.value) {
            // Clear form with confirmation
            if (confirm('Clear the form?')) {
                emailContent.value = '';
                toneSelect.value = '';
                emailContent.style.height = 'auto';
                updateStatus('Form cleared', 'ready');
                emailContent.focus();
            }
        }
    }

    // Ctrl/Cmd + K to focus on email content
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        emailContent.focus();
        emailContent.select();
    }
});

// Add CSS classes for enhanced animations (will be added via JavaScript)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .error-shake {
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    .expanding {
        transition: height 0.2s ease-out;
    }

    .selected {
        transform: scale(1.02);
        transition: transform 0.3s ease;
    }

    .loading {
        position: relative;
        overflow: hidden;
    }

    .error-appear {
        animation: errorSlideIn 0.5s ease-out;
    }

    @keyframes errorSlideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .results-appear {
        animation: resultsSlideIn 0.6s ease-out;
    }

    @keyframes resultsSlideIn {
        from {
            opacity: 0;
            transform: translateY(15px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .status-ready { background: #10b981; }
    .status-analyzing { background: #f59e0b; animation: pulse 1s ease-in-out infinite; }
    .status-generating { background: #8b5cf6; animation: pulse 1s ease-in-out infinite; }
    .status-success { background: #10b981; }
    .status-error { background: #ef4444; }

    .copied {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
        transform: scale(1.05);
    }

    .focused {
        transform: translateY(-1px);
        transition: transform 0.2s ease;
    }

    .typing {
        border-color: rgba(255, 255, 255, 0.6) !important;
    }

    .keyboard-submit {
        transform: scale(0.98);
        transition: transform 0.15s ease;
    }

    .loaded {
        animation: pageLoad 0.8s ease-out;
    }

    @keyframes pageLoad {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

document.head.appendChild(styleSheet);