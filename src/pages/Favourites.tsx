import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { IMAGE_PATH } from '../services/api';
import type { Movie } from '../types/media.types';

export default function Favourites() {
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavourites = () => {
      try {
        const saved = localStorage.getItem('favourites');
        const items = saved ? JSON.parse(saved) : [];
        setFavourites(items);
      } catch (error) {
        console.error('Error loading favourites:', error);
        setFavourites([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavourites();
  }, []);

  const handleRemoveFromFavourites = (movieId: number) => {
    const updated = favourites.filter(item => item.id !== movieId);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  const handleMovieClick = (movie: Movie & { media_type?: string }) => {
    if (movie.media_type === 'tv') {
      navigate(`/details/tv/${movie.id}`);
    } else {
      navigate(`/details/movie/${movie.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading favourites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 md:px-8 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Favourites</h1>
        <p className="text-gray-400 mb-8">
          {favourites.length} {favourites.length === 1 ? 'item' : 'items'} in your favourites
        </p>

        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-96">
            <svg
              className="w-16 h-16 text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-white mb-2">No Favourites Yet</h2>
            <p className="text-gray-400 mb-8 text-center max-w-md">
              Start adding movies and series to your favourites to see them here!
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favourites.map((item) => (
              <div key={item.id} className="group relative">
                <div
                  onClick={() => handleMovieClick(item)}
                  className="relative overflow-hidden rounded-lg cursor-pointer mb-3"
                >
                  <img
                    src={`${IMAGE_PATH}/${item.poster_path || item.backdrop_path}`}
                    alt={item.title || 'Movie'}
                    className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-semibold truncate">
                      {item.title || item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="bg-red-600 px-2 py-0.5 rounded text-xs font-bold text-white">
                        {item.vote_average.toFixed(1)}/10
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromFavourites(item.id)}
                    className="shrink-0 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                    title="Remove from favourites"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
