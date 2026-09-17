import { useState, useEffect, useCallback, useRef } from "react";
import { API_KEY, BASE_URL } from "../services/api";
import type { Movie } from "../types/media.types";

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

/**
 * Custom hook for debounced search functionality
 * Prevents API calls on every keystroke by waiting 500ms of inactivity
 * @param debounceDelay - Delay in milliseconds before making API call (default: 500)
 * @returns Search state and handlers
 */
export const useSearch = (debounceDelay: number = 500): UseSearchReturn => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    isMounted.current = true; // Set to true on every mount

    return () => {
      isMounted.current = false; // Set to false on unmount
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Perform the actual search
  const performSearch = useCallback(async (query: string, page: number = 1) => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      setTotalPages(0);
      setCurrentPage(1);
      return;
    }

    if (page === 1) setLoading(true);
    else setLoadingMore(true);
    setError(null);

    try {
      const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (isMounted.current) {
        // Filter for movies and tv shows, exclude those without poster paths
        const filteredResults = data.results.filter(
          (item: Record<string, unknown>) =>
            (item.media_type === "movie" || item.media_type === "tv") &&
            item.poster_path
        );

        setResults((prev) => (page === 1 ? filteredResults : [...prev, ...filteredResults]));
        setCurrentPage(data.page || 1);
        setTotalPages(data.total_pages || 0);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : "Failed to search");
        if (page === 1) {
          setResults([]);
          setTotalPages(0);
        }
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, []);

  // Handle search with debouncing
  const handleSearchInput = useCallback(
    (query: string) => {
      setSearchQuery(query);

      // Clear previous timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Set new timer
      if (query.trim()) {
        debounceTimer.current = setTimeout(() => {
          performSearch(query);
        }, debounceDelay);
      } else {
        setResults([]);
        setError(null);
      }
    },
    [debounceDelay, performSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setResults([]);
    setError(null);
    setCurrentPage(1);
    setTotalPages(0);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  }, []);

  const hasMore = currentPage < totalPages;

  const loadMore = useCallback(() => {
    if (searchQuery.trim() && currentPage < totalPages) {
      performSearch(searchQuery, currentPage + 1);
    }
  }, [searchQuery, currentPage, totalPages, performSearch]);

  return {
    results,
    loading,
    loadingMore,
    error,
    searchQuery,
    setSearchQuery: handleSearchInput,
    clearSearch,
    hasMore,
    loadMore,
  };
};

export default useSearch;
