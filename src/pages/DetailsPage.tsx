import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { DetailMovieContext } from "../context/SideBarContextLine";
import { BASE_URL, API_KEY, MEDIA_PATH } from "../services/api";
import DetailsHero from "../components/DetailsHero";
import Carousel from "../components/Carousel";
import VideoPlayer from "../components/VideoPlayer";
import type { Movie } from "../types/media.types";
import Cast from "../components/Cast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TvDetailsSkeletonLoader from "../components/TvDetailsSkeletonLoader";

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useContext(DetailMovieContext);
  const mySwal = withReactContent(Swal);

  if (!context) throw new Error("DetailMovieContext must be used within a provider");

  const { selectedMovie, setSelectedMovie } = context;
  const [cast, setCast] = useState<Cast[]>([]);
  const [castLoading, setCastLoading] = useState(true);
  const [runtime, setRuntime] = useState<number | null>(null);
  const [isInFavourites, setIsInFavourites] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [movieLoading, setMovieLoading] = useState(true);
  const [movieNotFound, setMovieNotFound] = useState(false);

  useEffect(() => {
    if (selectedMovie && id && parseInt(id) === selectedMovie.id) {
      setMovieLoading(false);
      return;
    }
    if (!id) {
      setMovieLoading(false);
      return;
    }
    const fetchMovieDetails = async () => {
      setMovieLoading(true);
      setMovieNotFound(false);
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setSelectedMovie(data);
        setMovieNotFound(false);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setMovieNotFound(true);
      } finally {
        setMovieLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id, selectedMovie, setSelectedMovie]);

  useEffect(() => {
    if (!id) return;
    const fetchCast = async () => {
      try {
        setCastLoading(true);
        const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
        const data = await res.json();
        setCast(data.cast?.slice(0, 8) || []);
      } catch (err) {
        console.error("Error fetching cast:", err);
      } finally {
        setCastLoading(false);
      }
    };
    fetchCast();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchRuntime = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setRuntime(data.runtime || null);
      } catch (err) {
        console.error("Error fetching runtime:", err);
        setRuntime(null);
      }
    };
    fetchRuntime();
  }, [id]);

  useEffect(() => {
    if (!selectedMovie) return;
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    setIsInFavourites(favourites.some((item: Movie) => item.id === selectedMovie.id));
  }, [selectedMovie]);

  const handleToggleFavourites = () => {
    if (!selectedMovie) return;
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    const inFav = favourites.some((item: Movie) => item.id === selectedMovie.id);
    if (!inFav) {
      favourites.push(selectedMovie);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      setIsInFavourites(true);
      mySwal.fire({
        html: (
          <div style={{ fontFamily: "'Manrope', sans-serif", display: "flex", alignItems: "center", gap: "8px"}}>
            <div style={{ fontSize: "0.75rem", marginBottom: "4px" }}>❤️</div>
            <div style={{ color: "#ff8d8f", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>Added to Favourites</div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.75rem", marginBottom:"4px"}}>{selectedMovie.title}</div>
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
      const updated = favourites.filter((item: Movie) => item.id !== selectedMovie.id);
      localStorage.setItem("favourites", JSON.stringify(updated));
      setIsInFavourites(false);
      mySwal.fire({
        html: (
          <div style={{ fontFamily: "'Manrope', sans-serif", textAlign: "center", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ fontSize: "0.75rem", marginBottom: "4px" }}>🗑️</div>
            <div style={{ color: "#adaaaa", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>Removed from Favourites</div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.75rem", marginBottom: "4px" }}>{selectedMovie.title}</div>
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
  if (movieLoading) {
    return (
      <TvDetailsSkeletonLoader/>
    );
  }

  // Not found
  if (movieNotFound || !selectedMovie) {
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

  const backdropImage = selectedMovie.backdrop_path || selectedMovie.poster_path;
  const releaseYear = selectedMovie.release_date?.split("-")[0] || "N/A";

  return (
    <div style={{ background: "#0e0e0e" }}>
      <VideoPlayer
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        mediaUrl={`${MEDIA_PATH}/movie/${id}`}
        title={selectedMovie.title}
      />

      <DetailsHero
        selectedMovie={selectedMovie}
        backdropImage={backdropImage}
        runtime={runtime}
        releaseYear={releaseYear}
        handleToggleFavourites={handleToggleFavourites}
        isInFavourites={isInFavourites}
        onPlayClick={() => setIsPlayerOpen(true)}
      />

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
        url={`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`}
        onMovieClick={handleMovieClick}
        accentLastWord
      />
      <Carousel
        title="You Might Also Like"
        url={`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`}
        onMovieClick={handleMovieClick}
        accentLastWord
      />
    </div>
  );
}
