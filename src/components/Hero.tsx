import { useState, useEffect, useMemo } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import { API_KEY, BASE_URL, IMAGE_PATH } from "../services/api";
import { type Movie } from "../types/media.types";
import { genreConversion } from "../services/genreConversion";
import { useNavigate } from "react-router";

const Hero = () => {
  const latestMoviesUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;
  const { movies: heroMovies, loading, error } = useFetchMovies(latestMoviesUrl);
  const navigate = useNavigate()
  const movies: Movie[] = useMemo(() => heroMovies.slice(0, 10), [heroMovies]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [genreMap, setGenreMap] = useState<Record<number, string[]>>({});

  useEffect(() => {
    if (isHovering || movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [movies.length, isHovering]);

  useEffect(() => {
    if (movies.length === 0) return;
    let isMounted = true;
    async function loadGenres() {
      const entries = await Promise.all(
        movies.map(async (movie) => {
          const names = await genreConversion(movie.genre_ids);
          return [movie.id, names];
        })
      );
      if (isMounted) setGenreMap(Object.fromEntries(entries));
    }
    loadGenres();
    return () => { isMounted = false; };
  }, [movies]);

  const handleNavigation = (id:number) => {
    navigate(`details/movie/${id}`)
  }

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToPrevious = () => setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % movies.length);

  const currentMovie = movies[currentIndex];
  const releaseYear = currentMovie?.release_date
    ? new Date(currentMovie.release_date).getFullYear()
    : null;

  // --- Loading state ---
  if (loading) {
    return (
      <div className="relative w-full h-[90vh] overflow-hidden" style={{ background: "#0e0e0e" }}>
        <div className="absolute inset-0 animate-pulse" style={{ background: "#131313" }} />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-14 pb-20 z-10">
          <div className="space-y-5 max-w-xl">
            <div className="h-4 rounded-full w-28 animate-pulse" style={{ background: "#262626" }} />
            <div className="h-14 rounded-xl w-3/4 animate-pulse" style={{ background: "#262626" }} />
            <div className="h-14 rounded-xl w-1/2 animate-pulse" style={{ background: "#262626" }} />
            <div className="flex gap-3 mt-4">
              <div className="h-4 rounded-full w-16 animate-pulse" style={{ background: "#262626" }} />
              <div className="h-4 rounded-full w-32 animate-pulse" style={{ background: "#262626" }} />
            </div>
            <div className="flex gap-3 mt-6">
              <div className="h-12 rounded-full w-36 animate-pulse" style={{ background: "#262626" }} />
              <div className="h-12 rounded-full w-32 animate-pulse" style={{ background: "#262626" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Error state ---
  if (error) {
    return (
      <div className="relative w-full h-[90vh] flex items-center justify-center" style={{ background: "#0e0e0e" }}>
        <div className="text-center">
          <p className="text-lg mb-2" style={{ color: "#ff8d8f" }}>Failed to load movies</p>
          <p className="text-sm" style={{ color: "#adaaaa" }}>{error}</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="relative w-full h-[90vh] flex items-center justify-center" style={{ background: "#0e0e0e" }}>
        <p style={{ color: "#adaaaa" }}>No movies available</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[90vh] overflow-hidden"
      style={{ background: "#000000" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slides */}
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          <img
            src={`${IMAGE_PATH}${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55)" }}
          />
        </div>
      ))}

      {/* Gradient overlays — cinematic depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(14,14,14,0.95) 0%, rgba(14,14,14,0.6) 50%, rgba(14,14,14,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(14,14,14,1) 0%, rgba(14,14,14,0.4) 30%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 pb-16 z-10">
        <div className="max-w-2xl">
          {/* NEW RELEASE pill */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,141,143,0.15)",
                color: "#ff8d8f",
                border: "1px solid rgba(255,141,143,0.3)",
              }}
            >
              Now Playing
            </span>
            {releaseYear && (
              <span className="text-xs" style={{ color: "#adaaaa" }}>
                {releaseYear}
              </span>
            )}
            {genreMap[currentMovie?.id] && (
              <span className="text-xs" style={{ color: "#adaaaa" }}>
                • {genreMap[currentMovie.id].slice(0, 2).join(" · ")}
              </span>
            )}
          </div>

          {/* Title — Manrope, asymmetrical editorial scale */}
          <h1
            className="font-black leading-[0.92] tracking-tight mb-5"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              color: "#ffffff",
              textShadow: "0 4px 32px rgba(0,0,0,0.6)",
            }}
          >
            {currentMovie?.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-7">
            <span
              className="flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,141,143,0.12)",
                color: "#ff8d8f",
              }}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {currentMovie?.vote_average.toFixed(1)}
            </span>
            {!genreMap[currentMovie?.id] && (
              <div className="h-4 w-32 rounded animate-pulse" style={{ background: "#262626" }} />
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105 cursor-pointer active:scale-95"
              style={{
                background: "linear-gradient(135deg, #ff8d8f 0%, #e9003a 100%)",
                boxShadow: "0 8px 24px rgba(233,0,58,0.35)",
                color: "#000000",
              }}
              onClick={() => handleNavigation(currentMovie.id)}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Watch Now
            </button>

            <button
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition-all hover:bg-white/10 cursor-pointer"
              style={{
                background: "rgba(38,38,38,0.5)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(72,72,71,0.25)",
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add to List
            </button>
          </div>
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white transition-all duration-300 cursor-pointer hover:scale-110"
        style={{
          background: "rgba(38,38,38,0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(72,72,71,0.2)",
          opacity: isHovering ? 1 : 0,
          pointerEvents: isHovering ? "auto" : "none",
        }}
        title="Previous"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white transition-all duration-300 cursor-pointer hover:scale-110"
        style={{
          background: "rgba(38,38,38,0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(72,72,71,0.2)",
          opacity: isHovering ? 1 : 0,
          pointerEvents: isHovering ? "auto" : "none",
        }}
        title="Next"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 right-8 z-20 flex gap-2 items-center">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: index === currentIndex ? "24px" : "6px",
              height: "6px",
              background: index === currentIndex ? "#ff8d8f" : "rgba(255,255,255,0.3)",
            }}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
