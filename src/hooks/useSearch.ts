import { useState, useEffect, useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { appendParams, BASE_URL, tmdbFetch } from "../services/api";
import { tmdbKeys } from "../services/queryKeys";
import type { Movie, Paged } from "../types/media.types";

interface UseSearchReturn {
  results: Movie[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  hasMore: boolean;
  loadMore: () => void;
}

type SearchItem = Movie & { media_type?: string };

const EMPTY: Movie[] = [];

/**
 * Custom hook for debounced search functionality
 * Prevents API calls on every keystroke by waiting for inactivity
 * @param debounceDelay - Delay in milliseconds before making API call (default: 500)
 * @returns Search state and handlers
 */
export const useSearch = (debounceDelay: number = 500): UseSearchReturn => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const delay = searchQuery.trim() ? debounceDelay : 0;
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), delay);
    return () => clearTimeout(timer);
  }, [searchQuery, debounceDelay]);

  const query = searchQuery.trim() ? debouncedQuery.trim() : "";
  const enabled = query.length > 0;

  const { data, isPending, isFetchingNextPage, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: tmdbKeys.search(query),
      queryFn: ({ pageParam, signal }) =>
        tmdbFetch<Paged<SearchItem>>(
          appendParams(`${BASE_URL}/search/multi`, { query, page: pageParam }),
          signal
        ),
      initialPageParam: 1,
      getNextPageParam: (last) => (last.page < last.total_pages ? last.page + 1 : undefined),
      enabled,
    });

  const results = useMemo(
    () =>
      enabled && data
        ? data.pages.flatMap((p) =>
            p.results.filter(
              (item) => (item.media_type === "movie" || item.media_type === "tv") && item.poster_path
            )
          )
        : EMPTY,
    [data, enabled]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, []);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    results,
    loading: enabled && isPending,
    loadingMore: isFetchingNextPage,
    error: enabled ? (error?.message ?? null) : null,
    searchQuery,
    setSearchQuery,
    clearSearch,
    hasMore: enabled && !!hasNextPage,
    loadMore,
  };
};

export default useSearch;
