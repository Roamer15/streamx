import type { GenreData } from "../types/media.types";
import { API_KEY, BASE_URL } from "./api";

let cachedGenres: GenreData[] | null = null;

export async function fetchGenres(): Promise<GenreData[]> {
  const response = await fetch(`${BASE_URL}/genre/movie/list?language=en&api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.genres;
}

export async function genreConversion(ids: number[]): Promise<string[]> {
  // Use cached genres to avoid repeated API calls
  if (!cachedGenres) {
    cachedGenres = await fetchGenres();
  }

  return ids
    .map((id) => cachedGenres!.find((g) => g.id === id)?.name)
    .filter((name): name is string => Boolean(name));
}
