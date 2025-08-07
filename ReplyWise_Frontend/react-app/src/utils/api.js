// Configuration
// const API_URL = 'https://replywise-8zw4.onrender.com/api/openai';
const API_URL = 'http://localhost:8080/api/openai'

// Main API call function with enhanced loading states
export async function generateEmailResponse(content, tone) {
  console.log('=== DEBUG INFO ===');
  console.log('Email content:', content);
  console.log('Selected tone:', tone);
  console.log('Content length:', content.length);

  const requestBody = {
    UserMessage: content,
    tone: tone
  };

  console.log('Request body:', requestBody);
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

  return data;
}

// Enhanced error handling with better messaging
export function handleApiError(error) {
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

  return { message, statusType };
} 