import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { IMAGE_PATH } from "../services/api";
import type { Movie } from "../types/media.types";

export default function Favourites() {
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("favourites");
      setFavourites(saved ? JSON.parse(saved) : []);
    } catch {
      setFavourites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemove = (movieId: number) => {
    const updated = favourites.filter((item) => item.id !== movieId);
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const handleClick = (item: Movie & { media_type?: string }) => {
    navigate(
      item.media_type === "tv"
        ? `/details/tv/${item.id}`
        : `/details/movie/${item.id}`
    );
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0e0e0e" }}
      >
        <div
          className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2"
          style={{ borderColor: "#ff8d8f" }}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-6 md:px-14 py-10"
      style={{ background: "#0e0e0e" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-2"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <span className="text-white">My </span>
            <span style={{ color: "#ff8d8f" }}>Favourites</span>
          </h1>
          <p className="text-sm" style={{ color: "#adaaaa" }}>
            {favourites.length}{" "}
            {favourites.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* Empty state */}
        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-96 gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "#131313",
                border: "1px solid rgba(72,72,71,0.2)",
              }}
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Nothing saved yet
            </h2>
            <p
              className="text-sm text-center max-w-xs"
              style={{ color: "#adaaaa" }}
            >
              Add movies and series to your favourites to find them here.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 rounded-full text-sm font-bold transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #ff8d8f 0%, #e9003a 100%)",
                color: "#000",
                boxShadow: "0 8px 24px rgba(233,0,58,0.3)",
              }}
            >
              Explore Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {favourites.map((item) => (
              <div key={item.id} className="group relative">
                {/* Poster */}
                <div
                  className="relative overflow-hidden mb-3 cursor-pointer"
                  style={{
                    borderRadius: "16px",
                    aspectRatio: "2/3",
                    background: "#1a1919",
                  }}
                  onClick={() => handleClick(item)}
                >
                  <img
                    src={`${IMAGE_PATH}${item.poster_path || item.backdrop_path}`}
                    alt={item.title || "Poster"}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75 group-hover:scale-105"
                  />
                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                    }}
                  />
                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(item.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(14,14,14,0.8)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,141,143,0.3)",
                      color: "#ff8d8f",
                    }}
                    title="Remove from favourites"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" fill="none" />
                    </svg>
                  </button>
                </div>

                {/* Title + rating */}
                <h3
                  className="text-white text-xs font-semibold truncate"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {item.title || item.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <svg
                    className="w-3 h-3 fill-current"
                    style={{ color: "#ff8d8f" }}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs" style={{ color: "#adaaaa" }}>
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
