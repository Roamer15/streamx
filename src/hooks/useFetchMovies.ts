import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api'

const useFetchMovies = (url: string) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getMovies = (url: string) => {
        setLoading(true);
        setError(null);
        
        fetchMovies(url)
            .then(data => {
                if (data) {
                    setMovies(data);
                    setError(null);
                }
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : 'Failed to fetch movies');
                setMovies([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        getMovies(url);
    }, [url]); // Re-run effect when the URL changes

    return { movies, loading, error };
};

export default useFetchMovies;