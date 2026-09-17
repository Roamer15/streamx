export interface EmbedProvider {
  id: string;
  name: string;
  getMovieUrl: (tmdbId: string) => string;
  getTvUrl: (tmdbId: string, season: number, episode: number) => string;
}

const DEFAULT_MEDIA_PATH = import.meta.env.VITE_BASE_MEDIA_URL;

export const embedProviders: EmbedProvider[] = [
  {
    id: 'vidsrc-embed',
    name: 'Server 1',
    getMovieUrl: (tmdbId) => `${DEFAULT_MEDIA_PATH}/movie/${tmdbId}`,
    // this provider uses a dash between season and episode, unlike the others below
    getTvUrl: (tmdbId, season, episode) => `${DEFAULT_MEDIA_PATH}/tv/${tmdbId}/${season}-${episode}`,
  },
  {
    id: 'vidsrc-to',
    name: 'Server 2',
    getMovieUrl: (tmdbId) => `https://vidsrc.to/embed/movie/${tmdbId}`,
    getTvUrl: (tmdbId, season, episode) => `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}`,
  },
  {
    id: '2embed',
    name: 'Server 3',
    getMovieUrl: (tmdbId) => `https://www.2embed.cc/embed/movie/${tmdbId}`,
    getTvUrl: (tmdbId, season, episode) => `https://www.2embed.cc/embedtv/${tmdbId}&s=${season}&e=${episode}`,
  },
  {
    id: 'vidlink',
    name: 'Server 4',
    getMovieUrl: (tmdbId) => `https://vidlink.pro/movie/${tmdbId}`,
    getTvUrl: (tmdbId, season, episode) => `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`,
  },
  {
    id: 'multiembed',
    name: 'Server 5',
    getMovieUrl: (tmdbId) => `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`,
    getTvUrl: (tmdbId, season, episode) => `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}`,
  },
];

export const DEFAULT_PROVIDER_ID = embedProviders[0].id;
