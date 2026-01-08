import { useParams, useNavigate } from 'react-router';
import { useTV } from '../hooks/useTV';
import { BASE_URL, API_KEY } from '../services/api';
import Cast from '../components/Cast';
import Carousel from '../components/Carousel';
import { useState, useEffect } from 'react';
import TvHero from '../components/TvHero';
import EpisodeCard from '../components/EpisodeCard';
import TvOverview from '../components/TvOverview';

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

  // Fetch Cast Data
  useEffect(() => {
    if (!id) return;

    const fetchCast = async () => {
      try {
        setCastLoading(true);
        const response = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
        const data = await response.json();
        setCast(data.cast?.slice(0, 8) || []);
      } catch (error) {
        console.error('Error fetching cast:', error);
      } finally {
        setCastLoading(false);
      }
    };

    fetchCast();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading series details...</p>
        </div>
      </div>
    );
  }

  if (error || !tvDetails) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Series Not Found</h1>
          <p className="text-gray-400 mb-8 text-lg">
            The series you are looking for does not exist. Please go back and select a valid series.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const backdropImage = tvDetails.backdrop_path || tvDetails.poster_path;
  const firstAirYear = tvDetails.first_air_date?.split('-')[0] || 'N/A';

  return (
    <div className="bg-gray-950">
      {/* Hero Section */}
      <TvHero tvDetails={tvDetails} backdropImage={backdropImage} firstAirYear={firstAirYear}/>

      {/* Overview Section */}
      <TvOverview tvDetails={tvDetails}/>

      {/* Seasons & Episodes Section */}
      <div className="px-4 md:px-8 lg:px-16 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Seasons & Episodes</h2>

        {/* Season Selector */}
        <div className="mb-8">
          <label className="block text-white font-semibold mb-3">Select Season</label>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
            className="w-full md:w-64 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
          >
            {tvDetails.seasons.map((season) => (
              <option key={season.season_number} value={season.season_number}>
                {season.name || `Season ${season.season_number}`}
              </option>
            ))}
          </select>
        </div>

        {/* Episodes Grid */}
        {episodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
             <EpisodeCard episode={episode}/>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No episodes available for this season</p>
        )}
      </div>

      {/* Cast Section */}
      <div className="px-4 md:px-8 lg:px-16 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Cast</h2>

        {castLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : cast.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {cast.map((actor) => (
              <Cast key={actor.id} actor={actor} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No cast information available</p>
        )}
      </div>

      {/* Similar Series Section */}
      <div className="py-8">
        <Carousel
          title="Similar Series"
          url={`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`}
          onMovieClick={() => {}}
        />
      </div>

      {/* Recommendations Section */}
      <div className="py-8">
        <Carousel
          title="You Might Also Like"
          url={`${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}`}
          onMovieClick={() => {}}
        />
      </div>
    </div>
  );
};

export default TVDetailsPage;
