import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { getContinueWatching, type ContinueWatchingEntry } from "../services/continueWatching";
import type { Movie } from "../types/media.types";
import MovieCard from "./MovieCard";

function toMovie(entry: ContinueWatchingEntry): Movie & { media_type?: string } {
  return {
    id: entry.id,
    title: entry.title,
    name: entry.title,
    poster_path: entry.poster_path ?? "",
    backdrop_path: entry.backdrop_path ?? "",
    vote_average: 0,
    genre_ids: [],
    original_title: entry.title,
    overview: "",
    popularity: 0,
    release_date: "",
    vote_count: 1204,
    media_type: entry.mediaType,
  };
}

function SectionTitle() {
  return (
    <h2
      className="text-xl md:text-2xl font-extrabold"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <span className="text-white">Continue </span>
      <span style={{ color: "#ff8d8f" }}>Watching</span>
    </h2>
  );
}

export default function ContinueWatchingRow() {
  const [entries, setEntries] = useState<ContinueWatchingEntry[]>(() => getContinueWatching());
  const [isHovering, setIsHovering] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleFocus = () => setEntries(getContinueWatching());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 320;
    container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
  }, []);

  const handleMovieClick = useCallback(
    (movie: Movie & { media_type?: string }) => {
      navigate(`/details/${movie.media_type === "tv" ? "tv" : "movie"}/${movie.id}`);
    },
    [navigate]
  );

  if (entries.length === 0) return null;

  const movies = entries.map(toMovie);

  return (
    <section
      className="px-6 md:px-14"
      style={{ paddingTop: "5.5rem", paddingBottom: "0.5rem" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <SectionTitle />
      </div>

      <div className="md:hidden grid grid-cols-3 gap-3">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} width="w-full" onMovieClick={handleMovieClick} />
        ))}
      </div>

      <div className="hidden md:block relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-hidden scroll-smooth pb-1 scrollbar-custom"
          style={{ scrollBehavior: "smooth" }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onMovieClick={handleMovieClick} />
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 p-2.5 rounded-full text-white transition-all duration-300"
          style={{
            background: "rgba(38,38,38,0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(72,72,71,0.25)",
            opacity: isHovering ? 1 : 0,
            pointerEvents: isHovering ? "auto" : "none",
          }}
          title="Scroll left"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 p-2.5 rounded-full text-white transition-all duration-300"
          style={{
            background: "rgba(38,38,38,0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(72,72,71,0.25)",
            opacity: isHovering ? 1 : 0,
            pointerEvents: isHovering ? "auto" : "none",
          }}
          title="Scroll right"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
