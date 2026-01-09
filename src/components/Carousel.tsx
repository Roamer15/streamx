import { useRef, useCallback, memo, useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import { type Movie } from "../types/media.types";
import MovieCard from "./MovieCard";

interface CarouselProps {
    title: string;
    url: string;
    onMovieClick?: (movie: Movie & { media_type?: string }) => void;
}

const Carousel = memo(({title, url, onMovieClick}: CarouselProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const latestMoviesUrl = url;
  const { movies: LatestMovies, loading, error } = useFetchMovies(latestMoviesUrl);

  const movies: (Movie & { media_type?: string })[] = LatestMovies.slice(0, 15)

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newPosition =
      direction === "left"
        ? Math.max(0, container.scrollLeft - scrollAmount)
        : container.scrollLeft + scrollAmount;

    container.scrollLeft = newPosition;
  }, []);

  const handleMovieClick = useCallback((movie: Movie & { media_type?: string }) => {
    onMovieClick?.(movie);
  }, [onMovieClick]);

  if (loading) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="text-red-500">Failed to load movies: {error}</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="text-gray-400">No movies available</div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 py-4" onMouseOver={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}>
      <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>

      {/* Mobile Grid View */}
      <div className="md:hidden grid grid-cols-3 gap-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} width="w-full" onMovieClick={handleMovieClick}/>
        ))}
      </div>

      {/* Desktop Carousel View */}
      <div className="hidden md:block relative">
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          id="latest-movies-scroll"
          className="flex gap-4 overflow-x-hidden overflow-y-hidden scroll-smooth pb-0"
          onMouseOver={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ scrollBehavior: "smooth" }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onMovieClick={handleMovieClick}/>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white p-2 rounded-full transition-all duration-300 hidden md:block ${isHovering ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-300 hidden md:block ${isHovering ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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
});

Carousel.displayName = "Carousel";

export default Carousel;
