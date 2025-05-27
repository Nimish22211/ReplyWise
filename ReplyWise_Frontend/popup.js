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

// Configuration
const API_URL = 'http://localhost:8080/api/openai';

// State management
let currentResponse = '';

// Event Listeners
emailForm.addEventListener('submit', handleFormSubmit);
copyBtn.addEventListener('click', copyToClipboard);
retryBtn.addEventListener('click', hideError);

// Auto-resize textarea
emailContent.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

// Form submission handler
async function handleFormSubmit(e) {
    e.preventDefault();

    const content = emailContent.value.trim();
    const tone = toneSelect.value;

    // Debug logging for form values
    console.log('=== FORM SUBMISSION DEBUG ===');
    console.log('Raw email content value:', emailContent.value);
    console.log('Trimmed content:', content);
    console.log('Selected tone value:', tone);
    console.log('Form element values:');
    console.log('- emailContent.value:', emailContent.value);
    console.log('- toneSelect.value:', toneSelect.value);
    console.log('- toneSelect.selectedIndex:', toneSelect.selectedIndex);
    console.log('- toneSelect.options[selectedIndex]:', toneSelect.options[toneSelect.selectedIndex]);

    if (!content || !tone) {
        console.error('Validation failed:');
        console.error('- Content empty:', !content);
        console.error('- Tone empty:', !tone);
        showError('Please fill in all fields');
        return;
    }

    console.log('Form validation passed, calling API...');
    await generateEmailResponse(content, tone);
}

// Main API call function
async function generateEmailResponse(content, tone) {
    setLoading(true);
    hideError();
    hideResults();
    updateStatus('Generating response...');

    // Debug logging
    console.log('=== DEBUG INFO ===');
    console.log('Email content:', content);
    console.log('Selected tone:', tone);
    console.log('Content length:', content.length);
    console.log('Content type:', typeof content);

    const requestBody = {
        UserMessage: content,
        tone: tone
    };

    console.log('Request body:', requestBody);
    console.log('JSON stringified:', JSON.stringify(requestBody));

    try {
        console.log('Making request to:', API_URL);

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

        displayResults(data.emailSummary, data.emailResponse);
        updateStatus('Response generated successfully!');

    } catch (error) {
        console.error('Error generating response:', error);
        handleApiError(error);
    } finally {
        setLoading(false);
    }
}

// Error handling
function handleApiError(error) {
    let message = 'Something went wrong. Please try again.';

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
    updateStatus('Error occurred');
}

// UI State Management
function setLoading(isLoading) {
    generateBtn.disabled = isLoading;
    if (isLoading) {
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
    } else {
        btnText.classList.remove('hidden');
        loader.classList.add('hidden');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');
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
}

function updateStatus(message) {
    status.textContent = message;
    // Auto-clear status after 3 seconds
    setTimeout(() => {
        if (status.textContent === message) {
            status.textContent = 'Ready';
        }
    }, 3000);
}

// Copy to clipboard functionality
async function copyToClipboard() {
    if (!currentResponse) return;

    try {
        await navigator.clipboard.writeText(currentResponse);
        copyBtn.textContent = '✅ Copied!';
        updateStatus('Response copied to clipboard');

        // Reset button text after 2 seconds
        setTimeout(() => {
            copyBtn.textContent = '📋 Copy Response';
        }, 2000);

    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        // Fallback for older browsers
        fallbackCopyToClipboard(currentResponse);
    }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        copyBtn.textContent = '✅ Copied!';
        updateStatus('Response copied to clipboard');

        setTimeout(() => {
            copyBtn.textContent = '📋 Copy Response';
        }, 2000);
    } catch (error) {
        showError('Failed to copy to clipboard');
    } finally {
        document.body.removeChild(textArea);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    updateStatus('Ready');
    emailContent.focus();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!generateBtn.disabled) {
            emailForm.dispatchEvent(new Event('submit'));
        }
    }

    // Escape to clear form
    if (e.key === 'Escape') {
        if (!results.classList.contains('hidden') || !errorDiv.classList.contains('hidden')) {
            hideResults();
            hideError();
            updateStatus('Ready');
        }
    }
});