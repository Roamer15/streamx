import { useQuery } from "@tanstack/react-query";
import { BASE_URL, tmdbFetch } from "../services/api";
import { tmdbKeys } from "../services/queryKeys";
import type { GenreData } from "../types/media.types";

export const useGenres = () =>
  useQuery({
    queryKey: tmdbKeys.genres(),
    queryFn: ({ signal }) =>
      tmdbFetch<{ genres: GenreData[] }>(`${BASE_URL}/genre/movie/list?language=en`, signal),
    staleTime: Infinity,
    select: (d) => new Map(d.genres.map((g) => [g.id, g.name] as const)),
  });

export default useGenres;
