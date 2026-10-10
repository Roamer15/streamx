import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { DetailMovieContext } from "../context/SideBarContextLine";
import { BASE_URL, tmdbImage } from "../services/api";
import DetailsHero from "../components/DetailsHero";
import Carousel from "../components/Carousel";
import VideoPlayer from "../components/VideoPlayer";
import type { Movie } from "../types/media.types";
import Cast from "../components/Cast";
import { useCredits } from "../hooks/useCredits";
import { useMovieDetails } from "../hooks/useMovieDetails";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TvDetailsSkeletonLoader from "../components/TvDetailsSkeletonLoader";
import SEO from "../components/SEO";
import { upsertContinueWatching } from "../services/continueWatching";

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useContext(DetailMovieContext);
  const mySwal = withReactContent(Swal);

  if (!context) throw new Error("DetailMovieContext must be used within a provider");

  const { selectedMovie, setSelectedMovie } = context;
  const [favouritesVersion, setFavouritesVersion] = useState(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { data: movie, isPending, isError, isPlaceholderData } = useMovieDetails(id, selectedMovie);
  const { cast, loading: castLoading } = useCredits("movie", id);
  const runtime = isPlaceholderData ? null : movie?.runtime ?? null;

  // favouritesVersion forces a re-render after localStorage changes
  void favouritesVersion;
  const isInFavourites = (() => {
    if (!movie) return false;
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    return favourites.some((item: Movie) => item.id === movie.id);
  })();

  const handleToggleFavourites = () => {
    if (!movie) return;
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    const inFav = favourites.some((item: Movie) => item.id === movie.id);
    if (!inFav) {
      favourites.push(movie);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      setFavouritesVersion((v) => v + 1);
      mySwal.fire({
        html: (
          <div style={{ fontFamily: "'Manrope', sans-serif", display: "flex", alignItems: "center", gap: "8px"}}>
            <div style={{ fontSize: "0.75rem", marginBottom: "4px" }}>❤️</div>
            <div style={{ color: "#ff8d8f", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>Added to Favourites</div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.75rem", marginBottom:"4px"}}>{movie.title}</div>
          </div>
        ),
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
        position: "top-end",
        toast: true,
        customClass: { popup: "swal-cinematic-toast" },
      });
    } else {
      const updated = favourites.filter((item: Movie) => item.id !== movie.id);
      localStorage.setItem("favourites", JSON.stringify(updated));
      setFavouritesVersion((v) => v + 1);
      mySwal.fire({
        html: (
          <div style={{ fontFamily: "'Manrope', sans-serif", textAlign: "center", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ fontSize: "0.75rem", marginBottom: "4px" }}>🗑️</div>
            <div style={{ color: "#adaaaa", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>Removed from Favourites</div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.75rem", marginBottom: "4px" }}>{movie.title}</div>
          </div>
        ),
        background: "rgba(19,19,19,0.92)",
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
        position: "top-end",
        toast: true,
        customClass: { popup: "swal-cinematic-toast" },
      });
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    navigate(`/details/movie/${movie.id}`);
  };

  // Loading state
  if (isPending) {
    return (
      <TvDetailsSkeletonLoader/>
    );
  }

  // Not found
  if (isError || !movie) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#0e0e0e" }}
      >
        <div className="text-center">
          <h1
            className="text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Movie Not Found
          </h1>
          <p className="mb-8 text-lg" style={{ color: "#adaaaa" }}>
            The movie you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-full text-sm font-bold transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #ff8d8f 0%, #e9003a 100%)",
              color: "#000",
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const backdropImage = movie.backdrop_path || movie.poster_path;
  const releaseYear = movie.release_date?.split("-")[0] || "N/A";

  return (
    <div style={{ background: "#0e0e0e" }}>
      <SEO
        title={`${movie.title} (${releaseYear}) - Watch Online | ChwiiX`}
        description={movie.overview ? movie.overview.slice(0, 160) : `Watch ${movie.title} online on ChwiiX.`}
        image={tmdbImage(movie.backdrop_path, "w1280")}
        type="video.movie"
      />
      <div className="px-6 md:px-14 pt-8 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-2 order-1">
          <VideoPlayer
            isPlaying={isPlayerOpen}
            onPlayClick={() => {
              upsertContinueWatching({
                id: movie.id,
                mediaType: "movie",
                title: movie.title,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
              });
              setIsPlayerOpen(true);
            }}
            backdropImage={backdropImage}
            title={movie.title}
            mediaType="movie"
            tmdbId={id!}
          />
        </div>
        <div className="lg:col-span-1 order-2">
          <DetailsHero
            selectedMovie={movie}
            runtime={runtime}
            releaseYear={releaseYear}
            handleToggleFavourites={handleToggleFavourites}
            isInFavourites={isInFavourites}
          />
        </div>
      </div>

      {/* Cast */}
      <div className="px-6 md:px-14 py-10">
        <h2
          className="text-2xl font-extrabold text-white mb-7"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Cast
        </h2>

        {castLoading ? (
          <div className="flex items-center justify-center h-32">
            <div
              className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2"
              style={{ borderColor: "#ff8d8f" }}
            />
          </div>
        ) : cast.length > 0 ? (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {cast.map((actor) => (
              <Cast key={actor.id} actor={actor} />
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: "#adaaaa" }}>
            No cast information available.
          </p>
        )}
      </div>

      {/* Similar & Recommendations */}
      <Carousel
        title="Similar Movies"
        url={`${BASE_URL}/movie/${id}/similar`}
        onMovieClick={handleMovieClick}
        accentLastWord
      />
      <Carousel
        title="You Might Also Like"
        url={`${BASE_URL}/movie/${id}/recommendations`}
        onMovieClick={handleMovieClick}
        accentLastWord
      />
    </div>
  );
}
