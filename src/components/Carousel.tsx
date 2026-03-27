import { useRef, useCallback, memo, useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import { type Movie } from "../types/media.types";
import MovieCard from "./MovieCard";
import { MovieSkeleton } from "./MovieCardSkeleton";

interface CarouselProps {
  title: string;
  url: string;
  onMovieClick?: (movie: Movie & { media_type?: string }) => void;
  /** Optional: highlights the last word in ruby accent */
  accentLastWord?: boolean;
}

/** Splits title so the last word gets the ruby accent colour */
function SectionTitle({ title, accent }: { title: string; accent?: boolean }) {
  if (!accent) {
    return (
      <h2
        className="text-xl md:text-2xl font-extrabold text-white"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {title}
      </h2>
    );
  }
  const words = title.trim().split(" ");
  const last = words.pop();
  return (
    <h2
      className="text-xl md:text-2xl font-extrabold"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <span className="text-white">{words.join(" ")} </span>
      <span style={{ color: "#ff8d8f" }}>{last}</span>
    </h2>
  );
}

const Carousel = memo(({ title, url, onMovieClick, accentLastWord = false }: CarouselProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const { movies: raw, loading, error } = useFetchMovies(url);
  const movies: (Movie & { media_type?: string })[] = raw.slice(0, 15);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 320;
    container.scrollLeft +=
      direction === "left" ? -scrollAmount : scrollAmount;
  }, []);

  const handleMovieClick = useCallback(
    (movie: Movie & { media_type?: string }) => {
      onMovieClick?.(movie);
    },
    [onMovieClick]
  );

  // --- Loading ---
  if (loading) {
    return (
      <section
        className="px-6 md:px-14"
        style={{ paddingTop: "5.5rem", paddingBottom: "1rem" }}
      >
        <div
          className="h-7 rounded-lg w-44 mb-7 animate-pulse"
          style={{ background: "#262626" }}
        />
        <div className="flex gap-5 overflow-hidden">
          {[...Array(7)].map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // --- Error ---
  if (error) {
    return (
      <section className="px-6 md:px-14" style={{ paddingTop: "5.5rem" }}>
        <SectionTitle title={title} accent={accentLastWord} />
        <p className="mt-4 text-sm" style={{ color: "#adaaaa" }}>
          Failed to load — {error}
        </p>
      </section>
    );
  }

  // --- Empty ---
  if (movies.length === 0) {
    return (
      <section className="px-6 md:px-14" style={{ paddingTop: "5.5rem" }}>
        <SectionTitle title={title} accent={accentLastWord} />
        <p className="mt-4 text-sm" style={{ color: "#adaaaa" }}>
          Nothing here yet.
        </p>
      </section>
    );
  }

  return (
    <section
      className="px-6 md:px-14"
      style={{ paddingTop: "5.5rem", paddingBottom: "0.5rem" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <SectionTitle title={title} accent={accentLastWord} />
        <button
          className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
          style={{ color: "#ff8d8f" }}
        >
          View all
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile: 3-col grid */}
      <div className="md:hidden grid grid-cols-3 gap-3">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            width="w-full"
            onMovieClick={handleMovieClick}
          />
        ))}
      </div>

      {/* Desktop: horizontal scroll carousel */}
      <div className="hidden md:block relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-hidden scroll-smooth pb-1 scrollbar-custom"
          style={{ scrollBehavior: "smooth" }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={handleMovieClick}
            />
          ))}
        </div>

        {/* Left arrow */}
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

        {/* Right arrow */}
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
});

Carousel.displayName = "Carousel";

export default Carousel;
