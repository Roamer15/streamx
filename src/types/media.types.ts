export interface Movie {
  backdrop_path: string;
  id: number;
  name: string;
  genre_ids: number[];
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: 1204;
}

export interface GenreData {
    id: number,
    name: string
}

export interface Paged<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export type MovieDetails = Movie & { runtime?: number | null };
