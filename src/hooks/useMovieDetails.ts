import { useQuery } from "@tanstack/react-query";
import { BASE_URL, tmdbFetch } from "../services/api";
import { tmdbKeys } from "../services/queryKeys";
import type { Movie, MovieDetails } from "../types/media.types";

export const useMovieDetails = (id: string | undefined, placeholder?: Movie | null) =>
  useQuery({
    queryKey: tmdbKeys.movie(id!),
    queryFn: ({ signal }) => tmdbFetch<MovieDetails>(`${BASE_URL}/movie/${id}`, signal),
    enabled: !!id,
    placeholderData: placeholder && String(placeholder.id) === id ? placeholder : undefined,
  });

export default useMovieDetails;
