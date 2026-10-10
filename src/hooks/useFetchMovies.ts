import { useQuery } from "@tanstack/react-query";
import { appendParams, tmdbFetch } from "../services/api";
import { tmdbKeys } from "../services/queryKeys";
import type { Movie, Paged } from "../types/media.types";

const EMPTY: Movie[] = [];

const useFetchMovies = (baseUrl: string) => {
  const url = appendParams(baseUrl, { page: 1 });
  const { data, isPending, error } = useQuery({
    queryKey: tmdbKeys.list(url),
    queryFn: ({ signal }) => tmdbFetch<Paged<Movie>>(url, signal),
  });

  return {
    movies: data?.results ?? EMPTY,
    loading: isPending,
    error: error?.message ?? null,
  };
};

export default useFetchMovies;
