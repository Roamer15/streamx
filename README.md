# ChwiiX

A modern, feature-rich streaming platform for discovering movies and TV shows. Built with React, TypeScript, and Vite, ChwiiX leverages the TMDB API to provide users with an extensive catalog of films and television content.

## About the Project

ChwiiX is a fully functional streaming discovery application that allows users to:
- Browse trending, latest, and top-rated movies and TV shows
- Explore content by genre (Anime, K-Drama, Bollywood, Martial Arts, Animation)
- Search for specific movies and TV shows
- View detailed information about movies and TV shows
- Watch trailers and videos directly in the app
- Enjoy a responsive, user-friendly interface

The project is built as part of the RebaseCodeCamp 2026 bootcamp, showcasing modern React development practices with TypeScript.

## What I've Built

### Core Features
- **Home Page**: Displays multiple carousels with trending content, latest releases, and genre-specific collections
- **Search Functionality**: Real-time search for movies and TV shows across the TMDB database
- **Detailed Views**: Individual pages for movie and TV show details with complete information (cast, ratings, synopsis, etc.)
- **TV Show Support**: Full support for TV series with episode tracking and season information
- **Video Player**: Integrated video player for watching trailers
- **Navigation**: Smooth routing with React Router for seamless navigation

### Technical Architecture
- **Frontend Framework**: React 19 with TypeScript for type-safe development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with responsive design support
- **State Management**: React Context API for managing app state (sidebar, selected media, etc.)
- **API Integration**: TMDB API for real-time movie and TV show data
- **Code Quality**: ESLint configuration for maintaining code standards

### Project Structure
```
src/
├── components/        # Reusable UI components (Navbar, Sidebar, Carousel, etc.)
├── pages/            # Full page components (Home, Search, Details pages)
├── context/          # React Context for state management
├── hooks/            # Custom React hooks for data fetching and sidebar logic
├── services/         # API integration and utility functions
├── types/            # TypeScript type definitions
├── assets/           # Static assets
└── App.tsx           # Main application component
```

### Key Components
- **Navbar**: Navigation bar with search capability
- **Sidebar**: Collapsible navigation menu
- **Carousel**: Horizontal scrolling content display
- **MovieCard/TVCard**: Individual content cards with hover effects
- **Hero Section**: Featured content display
- **VideoPlayer**: Embedded video playback for trailers
- **Footer**: Application footer with links and information

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd streamx
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```
VITE_BASE_API_KEY=your_tmdb_api_key
VITE_BASE_BASE_URL=https://api.themoviedb.org/3
VITE_BASE_MEDIA_URL=https://www.youtube.com/embed
```

4. Start the development server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Available Scripts

- `npm run dev`: Start the development server with hot module replacement
- `npm run build`: Build the application for production
- `npm run lint`: Run ESLint to check code quality
- `npm run preview`: Preview the production build locally

## Technology Stack

- **React**: 19.2.0 - UI library
- **TypeScript**: 5.9.3 - Type-safe JavaScript
- **Vite**: 7.2.4 - Build tool and dev server
- **Tailwind CSS**: 4.1.18 - Utility-first CSS framework
- **React Router**: 7.11.0 - Client-side routing
- **TMDB API**: Data source for movie and TV show information

## Development Notes

- The application uses React Context API for state management, making it lightweight and without external state management libraries
- Custom hooks (`useFetchMovies`, `useSearch`, `useSidebar`, `useTV`) encapsulate data fetching and sidebar logic
- The codebase is fully typed with TypeScript for better developer experience and fewer runtime errors
- Tailwind CSS is used for styling, with responsive classes for mobile, tablet, and desktop layouts

## Future Enhancements

Potential features for future versions:
- User authentication and bookmarking
- Watchlist functionality
- User ratings and reviews
- Streaming provider information
- Advanced filters and sorting options
- Offline support with caching
