import { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "../services/api";
import type { Movie } from "../types/media.types";

const useFetchMovies = (baseUrl: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getMovies = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      // Assuming your API service handles URL params, or append it here:
      const fetchUrl = `${baseUrl}&page=${page}`;
      
      const data = await fetchMovies(fetchUrl);
      
      if (data) {
        setMovies(data.results);
        setTotalPages(data.total_pages || 0);
        // We set current page based on API response to stay synced
        setCurrentPage(data.page || page);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch movies");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Trigger fetch when URL or Page changes
  useEffect(() => {
    getMovies(currentPage);
  }, [getMovies, currentPage]);

  // Reset to page 1 if the category/URL changes
  useEffect(() => {
    setCurrentPage(1);
  }, [baseUrl]);

  const goToPage = useCallback(
    (page: number) => {
      if (page > 0 && page <= totalPages && page !== currentPage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCurrentPage(page); // This is the trigger!
      }
    },
    [totalPages, currentPage]
  );

  return { movies, loading, error, totalPages, currentPage, goToPage };
};

export default useFetchMovies;