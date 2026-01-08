import { useParams, useNavigate } from 'react-router';
import { useTV } from '../hooks/useTV';
import { IMAGE_PATH, BASE_URL, API_KEY } from '../services/api';
import Cast from '../components/Cast';
import Carousel from '../components/Carousel';
import { useState, useEffect } from 'react';

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
      <div className="relative h-96 md:h-125 w-full overflow-hidden">
        {backdropImage && (
          <>
            <img
              src={`${IMAGE_PATH}${backdropImage}`}
              alt={tvDetails.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/50 to-transparent" />
          </>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end px-4 md:px-8 lg:px-16 py-8">
          <div className="flex gap-8 w-full">
            {tvDetails.poster_path && (
              <img
                src={`${IMAGE_PATH}${tvDetails.poster_path}`}
                alt={tvDetails.name}
                className="w-32 md:w-48 h-48 md:h-72 object-cover rounded-lg shadow-lg"
              />
            )}

            <div className="flex-1 flex flex-col justify-end mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{tvDetails.name}</h1>
              <p className="text-gray-400 mb-4">
                {tvDetails.genres.map((g) => g.name).join(', ')}
              </p>
              <div className="flex items-center gap-4 text-sm md:text-base">
                <span className="text-yellow-500 font-semibold">★ {tvDetails.vote_average.toFixed(1)}</span>
                <span className="text-gray-400">{firstAirYear}</span>
                <span className="text-gray-400">{tvDetails.number_of_seasons} Season{tvDetails.number_of_seasons !== 1 ? 's' : ''}</span>
                <span className="text-gray-400 bg-gray-800 px-3 py-1 rounded">{tvDetails.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="px-4 md:px-8 lg:px-16 py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl">{tvDetails.overview}</p>

        {tvDetails.created_by && tvDetails.created_by.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Created By</h3>
            <p className="text-gray-400">{tvDetails.created_by.map((creator) => creator.name).join(', ')}</p>
          </div>
        )}

        {tvDetails.networks && tvDetails.networks.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Networks</h3>
            <div className="flex gap-4 flex-wrap">
              {tvDetails.networks.map((network) => (
                <div key={network.id} className="bg-gray-800 px-4 py-2 rounded">
                  {network.logo_path ? (
                    <img
                      src={`${IMAGE_PATH}${network.logo_path}`}
                      alt={network.name}
                      className="h-8 object-contain"
                    />
                  ) : (
                    <p className="text-gray-300">{network.name}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
              <div
                key={episode.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {episode.still_path && (
                  <img
                    src={`${IMAGE_PATH}${episode.still_path}`}
                    alt={episode.name}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg">Episode {episode.episode_number}</h3>
                    <span className="text-yellow-500">★ {episode.vote_average.toFixed(1)}</span>
                  </div>
                  <p className="text-gray-300 font-semibold mb-2">{episode.name}</p>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{episode.overview}</p>
                  <p className="text-gray-500 text-xs">{episode.air_date}</p>

                  {episode.guest_stars && episode.guest_stars.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-gray-400 text-xs mb-1">Guest Stars:</p>
                      <p className="text-gray-300 text-xs">
                        {episode.guest_stars.slice(0, 2).map((star) => star.name).join(', ')}
                        {episode.guest_stars.length > 2 && ` +${episode.guest_stars.length - 2}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
