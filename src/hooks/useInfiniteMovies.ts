import { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "../services/api";
import type { Movie } from "../types/media.types";

const useInfiniteMovies = (baseUrl: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setTotalPages(0);
    setError(null);
  }, [baseUrl]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);
      setError(null);

      try {
        const data = await fetchMovies(`${baseUrl}&page=${page}`);
        if (cancelled) return;
        if (data) {
          setMovies((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
          setTotalPages(data.total_pages || 0);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to fetch movies");
      } finally {
        if (!cancelled) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [baseUrl, page]);

  const hasMore = page < totalPages;

  const loadMore = useCallback(() => {
    if (page < totalPages) setPage((p) => p + 1);
  }, [page, totalPages]);

  return { movies, loading, loadingMore, error, hasMore, loadMore };
};

export default useInfiniteMovies;
