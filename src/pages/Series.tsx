import { useEffect, useRef } from "react";
import type { Movie } from "../types/media.types";
import { useNavigate } from "react-router";
import MovieCard from "../components/MovieCard";
import SkeletonLoader from "../components/SkeletonLoader";
import { API_KEY, BASE_URL } from "../services/api";
import useInfiniteMovies from "../hooks/useInfiniteMovies";

export default function Series() {
  const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}`;
  const { movies, error, loading, loadingMore, hasMore, loadMore } =
    useInfiniteMovies(url);
  const navigate = useNavigate();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || loadingMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore]);

  return (
    <div className="min-h-screen text-white px-6 md:px-14 py-10" style={{ background: "#0e0e0e" }}>
      <div className="max-w-7xl mx-auto">
        {/* Page title */}
        <h1
          className="text-3xl md:text-4xl font-extrabold mb-8"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <span className="text-white">TV </span>
          <span style={{ color: "#ff8d8f" }}>Series</span>
        </h1>

        {/* Loading */}
        {loading && <SkeletonLoader />}

        {/* Error */}
        {error && (
          <div
            className="rounded-2xl p-4 mb-8 text-sm"
            style={{
              background: "rgba(233,0,58,0.07)",
              border: "1px solid rgba(255,141,143,0.2)",
              color: "#ff8d8f",
            }}
          >
            {error}
          </div>
        )}

        {/* Grid */}
        {!loading && movies.length > 0 && (
          <div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
              {movies.map((movie: Movie & { media_type?: string }) => (
                <div
                  key={movie.id}
                  onClick={() => navigate(`/details/tv/${movie.id}`)}
                  className="cursor-pointer"
                >
                  <MovieCard movie={movie} width="w-full" />
                </div>
              ))}
            </div>

            <div ref={sentinelRef} className="h-4" />

            {loadingMore && (
              <div className="flex justify-center py-8">
                <svg
                  className="w-8 h-8 animate-spin"
                  style={{ color: "#ff8d8f" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            )}

            {!hasMore && movies.length > 0 && (
              <p className="text-center text-xs py-8" style={{ color: "#adaaaa" }}>
                You've reached the end
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
