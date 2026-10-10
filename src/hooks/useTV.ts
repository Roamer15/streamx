import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL, tmdbFetch } from '../services/api';
import { tmdbKeys } from '../services/queryKeys';

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
  episodesLoading: boolean;
  error: string | null;
  setSelectedSeason: (season: number) => void;
}

const EMPTY_EPISODES: TVEpisode[] = [];

export const useTV = (tvId: number | string): UseTVReturn => {
  const id = String(tvId);
  const [selection, setSelection] = useState<{ tvId: string; season: number } | null>(null);

  const details = useQuery({
    queryKey: tmdbKeys.tv(id),
    queryFn: ({ signal }) => tmdbFetch<TVDetails>(`${BASE_URL}/tv/${id}`, signal),
  });
  const tvDetails = details.data;

  const selectedSeason =
    selection?.tvId === id ? selection.season : (tvDetails?.seasons[0]?.season_number ?? 0);

  const episodesEnabled = !!tvDetails;
  const episodes = useQuery({
    queryKey: tmdbKeys.season(id, selectedSeason),
    queryFn: ({ signal }) =>
      tmdbFetch<{ episodes?: TVEpisode[] }>(`${BASE_URL}/tv/${id}/season/${selectedSeason}`, signal),
    enabled: episodesEnabled,
    select: (d) => d.episodes ?? [],
  });

  const setSelectedSeason = (season: number) => setSelection({ tvId: id, season });

  return {
    tvDetails: tvDetails ?? null,
    episodes: episodes.data ?? EMPTY_EPISODES,
    selectedSeason,
    loading: details.isPending,
    episodesLoading: episodes.isPending && episodesEnabled,
    error: details.error?.message ?? null,
    setSelectedSeason,
  };
};

export default useTV;
