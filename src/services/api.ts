export { BASE_URL, tmdbImage, appendParams } from './config';
export type { TmdbImageSize } from './config';
export const MEDIA_PATH = import.meta.env.VITE_BASE_MEDIA_URL

export async function tmdbFetch<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal })
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  return res.json()
}
