import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSearch } from "../hooks/useSearch";
import type { Movie } from "../types/media.types";
import MovieCard from "../components/MovieCard";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const {
    results,
    loading,
    loadingMore,
    error,
    searchQuery,
    setSearchQuery,
    hasMore,
    loadMore,
  } = useSearch();

  useEffect(() => {
    if (query) setSearchQuery(query);
  }, [query, setSearchQuery]);

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
    <div
      className="min-h-screen text-white px-6 md:px-14 py-10"
      style={{ background: "#0e0e0e" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <span className="text-white">Search </span>
            <span style={{ color: "#ff8d8f" }}>Results</span>
          </h1>
          {query && searchQuery && (
            <p className="text-sm" style={{ color: "#adaaaa" }}>
              Showing results for:{" "}
              <span className="font-semibold text-white">"{searchQuery}"</span>
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-96 gap-4">
            <svg
              className="w-10 h-10 animate-spin"
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
            <p className="text-sm" style={{ color: "#adaaaa" }}>
              Searching...
            </p>
          </div>
        )}

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

        {/* Results */}
        {!loading && query && results.length > 0 ? (
          <div>
            <p className="text-sm mb-6" style={{ color: "#adaaaa" }}>
              {results.length} result
              {results.length !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
              {results.map((movie: Movie & { media_type?: string }) => (
                <div
                  key={movie.id}
                  onClick={() =>
                    navigate(
                      movie.media_type === "tv"
                        ? `/details/tv/${movie.id}`
                        : `/details/movie/${movie.id}`
                    )
                  }
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

            {!hasMore && results.length > 0 && (
              <p className="text-center text-xs py-8" style={{ color: "#adaaaa" }}>
                You've reached the end
              </p>
            )}
          </div>
        ) : !loading && query ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center min-h-96 gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "#131313", border: "1px solid rgba(72,72,71,0.2)" }}
            >
              <svg
                className="w-9 h-9"
                style={{ color: "#484847" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              No results found
            </h2>
            <p className="text-sm text-center max-w-xs" style={{ color: "#adaaaa" }}>
              Try different keywords or check the spelling
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
