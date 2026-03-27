import type { Movie } from "../types/media.types";
import { useNavigate } from "react-router";
import MovieCard from "../components/MovieCard";
import SkeletonLoader from "../components/SkeletonLoader";
import { API_KEY, BASE_URL } from "../services/api";
import useFetchMovies from "../hooks/useFetchMovies";

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
              currentPage === pageNum
                ? "none"
                : "1px solid rgba(72,72,71,0.25)",
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

export default function Series() {
  const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}`;
  const { movies, error, loading, totalPages, currentPage, goToPage } =
    useFetchMovies(url);
  const navigate = useNavigate();

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

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
