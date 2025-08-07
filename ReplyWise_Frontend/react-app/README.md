# ReplyWise React Frontend

A modern React application for the ReplyWise AI email assistant, featuring a premium dark theme UI with glassmorphism effects.

## Features

- 🎨 Premium dark mode UI with glassmorphism effects
- ⚡ Real-time email response generation
- 📝 Auto-resizing textarea with typing indicators
- 🎯 Multiple tone selection options
- 📋 One-click copy to clipboard
- ⌨️ Keyboard shortcuts (Ctrl+Enter to submit, Ctrl+K to focus, Escape to clear)
- 🔄 Enhanced error handling and retry functionality
- 📱 Responsive design optimized for extension popup

## Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Custom animations** - Smooth transitions and micro-interactions
- **Fetch API** - HTTP requests to backend

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the react-app directory:
```bash
cd ReplyWise_Frontend/react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`.

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## API Configuration

The app is configured to use the ReplyWise backend API at:
`https://replywise-8zw4.onrender.com/api/openai`

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Submit form
- `Ctrl/Cmd + K` - Focus on email content
- `Escape` - Clear form or hide results/errors

## UI Components

- **Header** - Logo and branding
- **EmailForm** - Input form with validation
- **Results** - Display generated responses
- **ErrorDisplay** - Error messages with retry
- **Footer** - Status indicator

## Styling

The app uses a custom Tailwind configuration with:
- Premium dark color palette
- Glassmorphism effects
- Custom animations and transitions
- Responsive design patterns

## Development

The app replicates all functionality from the original popup.html and popup.js files while providing a modern React-based architecture with enhanced UX features.
