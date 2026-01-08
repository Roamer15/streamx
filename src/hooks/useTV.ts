import { useState, useEffect } from 'react';
import { API_KEY, BASE_URL } from '../services/api';

export interface TVSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface TVEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  vote_average: number;
  guest_stars: Array<{
    character: string;
    name: string;
  }>;
}

export interface TVDetails {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  last_air_date: string;
  status: string;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: TVSeason[];
  genres: Array<{ id: number; name: string }>;
  vote_average: number;
  vote_count: number;
  networks: Array<{ id: number; name: string; logo_path: string | null }>;
  created_by: Array<{ id: number; name: string; credit_id: string }>;
}

interface UseTVReturn {
  tvDetails: TVDetails | null;
  episodes: TVEpisode[];
  selectedSeason: number;
  loading: boolean;
  error: string | null;
  setSelectedSeason: (season: number) => void;
}

export const useTV = (tvId: number | string): UseTVReturn => {
  const [tvDetails, setTVDetails] = useState<TVDetails | null>(null);
  const [episodes, setEpisodes] = useState<TVEpisode[]>([]);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch TV series details
  useEffect(() => {
    const fetchTVDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTVDetails(data);
        // Set default season to first season (usually season 0 or 1)
        setSelectedSeason(data.seasons[0]?.season_number || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch TV details');
        setTVDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTVDetails();
  }, [tvId]);

  // Fetch episodes for selected season
  useEffect(() => {
    if (!tvDetails) return;

    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${BASE_URL}/tv/${tvId}/season/${selectedSeason}?api_key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEpisodes(data.episodes || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch episodes');
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [tvId, selectedSeason, tvDetails]);

  return {
    tvDetails,
    episodes,
    selectedSeason,
    loading,
    error,
    setSelectedSeason,
  };
};

export default useTV;
