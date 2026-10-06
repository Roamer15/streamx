export const BASE_URL = '/api/tmdb'

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type TmdbImageSize =
  | 'w92' | 'w154' | 'w185' | 'w300' | 'w342' | 'w500' | 'w780' | 'w1280' | 'original';

/** Builds a TMDB image URL at an explicit size. Returns undefined when there is no path. */
export function tmdbImage(
  path: string | null | undefined,
  size: TmdbImageSize
): string | undefined {
  return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : undefined;
}

/** Appends query params to a URL, choosing ? or & correctly. */
export function appendParams(
  url: string,
  params: Record<string, string | number>
): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ""
  );
  if (entries.length === 0) return url;
  const qs = entries
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  return `${url}${url.includes("?") ? "&" : "?"}${qs}`;
}
