import { useQuery } from "@tanstack/react-query";
import { BASE_URL, tmdbFetch } from "../services/api";
import { tmdbKeys } from "../services/queryKeys";
import type { CastMember } from "../types/media.types";

const EMPTY: CastMember[] = [];

export const useCredits = (type: "movie" | "tv", id: string | undefined) => {
  const { data, isPending } = useQuery({
    queryKey: tmdbKeys.credits(type, id!),
    queryFn: ({ signal }) =>
      tmdbFetch<{ cast?: CastMember[] }>(`${BASE_URL}/${type}/${id}/credits`, signal),
    enabled: !!id,
    select: (d) => d.cast?.slice(0, 8) ?? [],
  });

  return { cast: data ?? EMPTY, loading: isPending && !!id };
};

export default useCredits;
