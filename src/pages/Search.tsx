import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSearch } from "../hooks/useSearch";
import type { Movie } from "../types/media.types";
import MovieCard from "../components/MovieCard";

function Pagination({
  currentPage,
  totalPages,
  goToPage,
}: {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  const btnBase: React.CSSProperties = {
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.875rem",
    transition: "all 0.2s",
    padding: "0.5rem 1.25rem",
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8 flex-wrap">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...btnBase,
          background: "#1a1919",
          color: currentPage === 1 ? "#484847" : "#adaaaa",
          border: "1px solid rgba(72,72,71,0.25)",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        ← Prev
      </button>
      {pages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => goToPage(pageNum)}
          style={{
            ...btnBase,
            padding: "0.5rem 0.9rem",
            background:
              currentPage === pageNum
                ? "linear-gradient(135deg, #ff8d8f 0%, #e9003a 100%)"
                : "#1a1919",
            color: currentPage === pageNum ? "#000" : "#adaaaa",
            border:
              currentPage === pageNum ? "none" : "1px solid rgba(72,72,71,0.25)",
            cursor: "pointer",
          }}
        >
          {pageNum}
        </button>
      ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...btnBase,
          background: "#1a1919",
          color: currentPage === totalPages ? "#484847" : "#adaaaa",
          border: "1px solid rgba(72,72,71,0.25)",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next →
      </button>
    </div>
  );
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const {
    results,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    currentPage,
    totalPages,
    goToPage,
  } = useSearch();

  useEffect(() => {
    if (query) setSearchQuery(query);
  }, [query, setSearchQuery]);

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
              Page {currentPage} of {totalPages} &mdash; {results.length} result
              {results.length !== 1 ? "s" : ""} on this page
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

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
              />
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
