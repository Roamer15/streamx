import { useState, useEffect } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import { API_KEY, BASE_URL, IMAGE_PATH } from "../services/api";
import { type Movie } from "../types/media.types";
import { genreConversion } from "../services/genreConversion";

const Hero = () => {
  const latestMoviesUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;
  const {
    movies: heroMovies,
    loading,
    error,
  } = useFetchMovies(latestMoviesUrl);

  const movies: Movie[] = heroMovies.slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate carousel every 7 seconds (pauses on hover)
  useEffect(() => {
    if (isHovering || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [movies.length, isHovering]);

  const [genreMap, setGenreMap] = useState<Record<number, string[]>>({});

  useEffect(() => {
    async function loadGenres() {
      const entries = await Promise.all(
        movies.map(async (movie) => [
          movie.id,
          await genreConversion(movie.genre_ids),
        ])
      );

      setGenreMap(Object.fromEntries(entries));
    }

    loadGenres();
  }, [movies]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const currentMovie = movies[currentIndex];

  // Show loading state
  if (loading) {
    return (
      <div className="relative w-full h-96 md:h-175 overflow-hidden bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          <p className="text-gray-400">Loading movies...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="relative w-full h-96 md:h-175 overflow-hidden bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-2">Failed to load movies</p>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (movies.length === 0) {
    return (
      <div className="relative w-full h-96 md:h-175 overflow-hidden bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">No movies available</p>
      </div>
    );
  }
  return (
    <div
      className="relative w-full h-96 md:h-175 overflow-hidden bg-gray-950"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {/* Movie Slides */}
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <img
              src={`${IMAGE_PATH}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/1 to-transparent" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-8 lg:px-16 z-10 pb-0 md:pb-0">
          <div className="max-w-2xl">
            {/* Movie Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {currentMovie?.title}
            </h1>

            {/* Movie Meta Info */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-4 text-sm md:text-base text-gray-200">
                <span className="bg-red-600 px-3 py-1 rounded-full font-semibold">
                  {currentMovie?.vote_average.toFixed(1)} / 10
                </span>
                <span>{genreMap[currentMovie?.id]?.join(" | ")}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              {/* <button className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Now
              </button>
              */}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 ${
            isHovering ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          title="Previous"
        >
          <svg
            className="w-6 h-6"
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
          onClick={goToNext}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 ${
            isHovering ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          title="Next"
        >
          <svg
            className="w-6 h-6"
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

        {/* Dots Indicator */}
        <div className="absolute bottom-4 right-8 md:right-4 z-20 flex gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "bg-red-600 w-3 h-3"
                  : "bg-white/40 hover:bg-white/60 w-2 h-2"
              }`}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
