import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { DetailMovieContext } from "../context/SideBarContextLine";
import { BASE_URL, API_KEY, IMAGE_PATH } from "../services/api";
import Carousel from "../components/Carousel";
import type { Movie } from "../types/media.types";

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useContext(DetailMovieContext);

  if (!context) {
    throw new Error("DetailMovieContext must be used within a provider");
  }

  const { selectedMovie, setSelectedMovie } = context;
  const [cast, setCast] = useState<Cast[]>([]);
  const [castLoading, setCastLoading] = useState(true);
  const [runtime, setRuntime] = useState<number | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Fetch Movie Details when selectedMovie is not available
  useEffect(() => {
    if (selectedMovie && id && parseInt(id) === selectedMovie.id) {
      return; // Use context selectedMovie if it matches URL id
    }

    if (!id) return;

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, selectedMovie, setSelectedMovie]);

  // Fetch Cast Data
  useEffect(() => {
    if (!id) return;

    const fetchCast = async () => {
      try {
        setCastLoading(true);
        const response = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );
        const data = await response.json();
        setCast(data.cast?.slice(0, 8) || []);
      } catch (error) {
        console.error("Error fetching cast:", error);
      } finally {
        setCastLoading(false);
      }
    };

    fetchCast();
  }, [id]);

  // Fetch Movie Runtime
  useEffect(() => {
    if (!id) return;

    const fetchRuntime = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRuntime(data.runtime || null);
      } catch (error) {
        console.error("Error fetching runtime:", error);
        setRuntime(null);
      }
    };

    fetchRuntime();
  }, [id]);

  // Check if movie is in watchlist
  useEffect(() => {
    if (!selectedMovie) return;
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsInWatchlist(
      watchlist.some((item: Movie) => item.id === selectedMovie.id)
    );
  }, [selectedMovie]);

  const handleAddToWatchlist = () => {
    if (!selectedMovie) return;

    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isMovieInWatchlist = watchlist.some((item: Movie) => item.id === selectedMovie.id);

    if (!isMovieInWatchlist) {
      watchlist.push(selectedMovie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      setIsInWatchlist(true);
      alert(`✓ Added to watchlist: ${selectedMovie.title}`);
    } else {
      alert(`Movie is already in the watchlist: ${selectedMovie.title}`);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    navigate(`/details/${movie.id}`);
  };

  // Error state if movie not found
  if (!selectedMovie || (id && parseInt(id) !== selectedMovie.id)) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Movie Not Found
          </h1>
          <p className="text-gray-400 mb-8 text-lg">
            The movie you are looking for does not exist. Please go back and
            select a valid movie.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const backdropImage =
    selectedMovie.backdrop_path || selectedMovie.poster_path;
  const releaseYear = selectedMovie.release_date?.split("-")[0] || "N/A";

  return (
    <div className="bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-96 md:h-screen overflow-hidden">
        {/* Backdrop Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IMAGE_PATH}${backdropImage})`,
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-end px-4 md:px-8 lg:px-16 pb-8 md:pb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {selectedMovie.title}
            </h1>

            {/* Movie Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="bg-red-600 px-4 py-2 rounded-full">
                <span className="text-white font-bold text-lg">
                  {selectedMovie.vote_average.toFixed(1)}/10
                </span>
              </div>
              <span className="text-gray-300 text-sm md:text-base">
                {releaseYear}
              </span>
              {runtime && (
                <span className="text-gray-300 text-sm md:text-base">
                  {runtime} min
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
              {selectedMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </button>

              <button
                onClick={handleAddToWatchlist}
                className={`${
                  isInWatchlist
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-700 hover:bg-gray-600"
                } text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-colors flex items-center gap-2`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="px-4 md:px-8 lg:px-16 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Cast</h2>

        {castLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : cast.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="group cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-64 md:h-72 bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-3">
                  {actor.profile_path ? (
                    <img
                      src={`${IMAGE_PATH}${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 text-sm text-center px-4">
                        No Image
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-white font-semibold text-sm truncate">
                  {actor.name}
                </h3>
                <p className="text-gray-400 text-xs truncate">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No cast information available</p>
        )}
      </div>

      {/* Similar Movies Section */}
      <div className="py-8">
        <Carousel
          title="Similar Movies"
          url={`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`}
          onMovieClick={handleMovieClick}
        />
      </div>

      {/* Recommendations Section */}
      <div className="py-8">
        <Carousel
          title="You Might Also Like"
          url={`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`}
          onMovieClick={handleMovieClick}
        />
      </div>
    </div>
  );
}
