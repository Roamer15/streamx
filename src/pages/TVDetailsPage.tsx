import { useParams, useNavigate } from "react-router";
import { useTV, type TVDetails } from "../hooks/useTV";
import { BASE_URL, API_KEY, MEDIA_PATH } from "../services/api";
import Cast from "../components/Cast";
import Carousel from "../components/Carousel";
import VideoPlayer from "../components/VideoPlayer";
import { useState, useEffect } from "react";
import type { Movie } from "../types/media.types";
import TvHero from "../components/TvHero";
import EpisodeCard from "../components/EpisodeCard";
import TvOverview from "../components/TvOverview";
import TvDetailsSkeletonLoader from "../components/TvDetailsSkeletonLoader";

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

const TVDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tvDetails, episodes, selectedSeason, setSelectedSeason, loading, error } = useTV(id!);
  const [cast, setCast] = useState<Cast[]>([]);
  const [castLoading, setCastLoading] = useState(true);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [isInFavourites, setIsInFavourites] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchCast = async () => {
      try {
        setCastLoading(true);
        const res = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
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
    if (!tvDetails) return;
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    setIsInFavourites(favourites.some((item: TVDetails) => item.id === tvDetails.id));
  }, [tvDetails]);

  const handleNavigationToSeries = (series: Movie & { media_type?: string }) => {
    navigate(`/details/tv/${series.id}`);
  };

  const handleToggleFavourites = () => {
    if (!tvDetails) return;
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    const inFav = favourites.some((item: TVDetails) => item.id === tvDetails.id);
    if (!inFav) {
      favourites.push(tvDetails);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      setIsInFavourites(true);
      alert(`✓ Added to favourites: ${tvDetails.name}`);
    } else {
      const updated = favourites.filter((item: TVDetails) => item.id !== tvDetails.id);
      localStorage.setItem("favourites", JSON.stringify(updated));
      setIsInFavourites(false);
      alert(`✓ Removed from favourites: ${tvDetails.name}`);
    }
  };

  if (loading) return <TvDetailsSkeletonLoader />;

  if (error || !tvDetails) {
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
            Series Not Found
          </h1>
          <p className="mb-8 text-lg" style={{ color: "#adaaaa" }}>
            The series you're looking for doesn't exist.
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

  const backdropImage = tvDetails.backdrop_path || tvDetails.poster_path;
  const firstAirYear = tvDetails.first_air_date?.split("-")[0] || "N/A";

  return (
    <div style={{ background: "#0e0e0e" }}>
      <VideoPlayer
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        mediaUrl={`${MEDIA_PATH}/tv/${id}/${selectedSeason}-${selectedEpisode || 1}`}
        title={tvDetails?.name || "Series"}
      />

      <TvHero
        tvDetails={tvDetails}
        backdropImage={backdropImage}
        firstAirYear={firstAirYear}
        isInFavourites={isInFavourites}
        onToggleFavourites={handleToggleFavourites}
        onPlayClick={() => setIsPlayerOpen(true)}
      />

      <TvOverview tvDetails={tvDetails} />

      {/* Seasons & Episodes */}
      <div className="px-6 md:px-14 py-10">
        <h2
          className="text-2xl font-extrabold text-white mb-6"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Seasons &amp; Episodes
        </h2>

        {/* Season selector */}
        <div className="mb-8">
          <label
            className="block text-sm font-semibold mb-3"
            style={{ color: "#adaaaa" }}
          >
            Select Season
          </label>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
            className="w-full md:w-64 px-4 py-2.5 text-sm text-white rounded-xl focus:outline-none transition-all"
            style={{
              background: "#1a1919",
              border: "1px solid rgba(72,72,71,0.3)",
              color: "#ffffff",
              appearance: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 2px rgba(255,141,143,0.15)";
              e.currentTarget.style.borderColor = "rgba(255,141,143,0.4)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "rgba(72,72,71,0.3)";
            }}
          >
            {tvDetails.seasons.map((season) => (
              <option
                key={season.season_number}
                value={season.season_number}
                style={{ background: "#1a1919" }}
              >
                {season.name || `Season ${season.season_number}`}
              </option>
            ))}
          </select>
        </div>

        {/* Episodes grid */}
        {episodes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                onPlayClick={(ep) => {
                  setSelectedEpisode(ep.episode_number);
                  setIsPlayerOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: "#adaaaa" }}>
            No episodes available for this season.
          </p>
        )}
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

      <Carousel
        title="Similar Series"
        url={`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`}
        onMovieClick={handleNavigationToSeries}
        accentLastWord
      />
      <Carousel
        title="You Might Also Like"
        url={`${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}`}
        onMovieClick={handleNavigationToSeries}
        accentLastWord
      />
    </div>
  );
};

export default TVDetailsPage;
