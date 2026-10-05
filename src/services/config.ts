export const BASE_URL = '/api/tmdb'
export const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'

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
