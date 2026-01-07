import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api'

const useFetchMovies = (url: string) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMovies = (url: string) => {
        fetchMovies(url).then(data => {
            if (data) {
                setMovies(data)
                setLoading(false)
            }
            setError(error)
        })
    }

    useEffect(() => {
        getMovies(url);
    }, [url]); // Re-run effect when the URL changes

    return { movies, loading, error };
};

export default useFetchMovies;