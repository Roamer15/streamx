import { useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { appendParams, tmdbFetch } from "../services/api";
import { tmdbKeys } from "../services/queryKeys";
import type { Movie, Paged } from "../types/media.types";

const useInfiniteMovies = (baseUrl: string) => {
  const { data, isPending, isFetchingNextPage, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: tmdbKeys.infinite(baseUrl),
      queryFn: ({ pageParam, signal }) =>
        tmdbFetch<Paged<Movie>>(appendParams(baseUrl, { page: pageParam }), signal),
      initialPageParam: 1,
      getNextPageParam: (last) => (last.page < last.total_pages ? last.page + 1 : undefined),
    });

  const movies = useMemo(() => data?.pages.flatMap((p) => p.results) ?? [], [data]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    movies,
    loading: isPending,
    loadingMore: isFetchingNextPage,
    error: error?.message ?? null,
    hasMore: hasNextPage,
    loadMore,
  };
};

export default useInfiniteMovies;
