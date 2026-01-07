export interface Movie {
  backdrop_path: string;
  id: number;
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