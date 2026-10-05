import { createClient } from '@supabase/supabase-js';

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

export const BASE_URL = '/api/tmdb'
export const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'
export const MEDIA_PATH = import.meta.env.VITE_BASE_MEDIA_URL

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)


export const fetchMovies = async(URL: string) => {
    try {
        const response = await fetch(URL)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data =  await response.json()
        return data
    }
    catch(error) {
        console.error('Error fetching movies', error)
    }
}

export default fetchMovies
