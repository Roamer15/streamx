import { useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import { API_KEY, BASE_URL, IMAGE_PATH } from "../services/api";
import { type Movie } from "../types/media.types";

const LatestMovies = () => {
  const latestMoviesUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;
  const { movies: LatestMovies, loading, error } = useFetchMovies(latestMoviesUrl);

  const movies: Movie[] = LatestMovies

  const [scrollPosition, setScrollPosition] = useState(0);


  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("latest-movies-scroll");
    if (!container) return;

    const scrollAmount = 300;
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;

    container.scrollLeft = newPosition;
    setScrollPosition(newPosition);
  };

  if (loading) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h2 className="text-2xl font-bold text-white mb-4">Latest Movies</h2>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h2 className="text-2xl font-bold text-white mb-4">Latest Movies</h2>
        <div className="text-red-500">Failed to load movies: {error}</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h2 className="text-2xl font-bold text-white mb-4">Latest Movies</h2>
        <div className="text-gray-400">No movies available</div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <h2 className="text-2xl font-bold text-black mb-6">Latest Movies</h2>

      <div className="relative">
        {/* Scroll Container */}
        <div
          id="latest-movies-scroll"
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="shrink-0 w-40 group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              {/* Movie Poster Card */}
              <div className="relative h-56 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`${IMAGE_PATH}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                />

                {/* Gradient Overlay for Title */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Title at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black to-transparent">
                  <p className="text-white text-sm font-semibold leading-tight line-clamp-2 group-hover:line-clamp-none">
                    {movie.title}
                  </p>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-300 hidden md:block"
          title="Scroll left"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-300 hidden md:block"
          title="Scroll right"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LatestMovies;
