import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { DetailMovieContext } from "../context/SideBarContextLine";
import { BASE_URL, API_KEY } from "../services/api";
import DetailsHero from "../components/DetailsHero";
import Carousel from "../components/Carousel";
import type { Movie } from "../types/media.types";
import Cast from "../components/Cast";

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

  //TSX
  return (
    <div className="bg-gray-950">
      {/* Hero Section */}
      <DetailsHero selectedMovie={selectedMovie} backdropImage={backdropImage} runtime={runtime} releaseYear={releaseYear} handleAddToWatchlist={handleAddToWatchlist} isInWatchlist={isInWatchlist}/>

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
              <Cast actor={actor}/>
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
