// import { useState, useEffect, useCallback } from 'react';
// import { fetchMovies } from '../services/api'

// const useFetchMovies = (url: string) => {
//     const [movies, setMovies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const getMovies = useCallback((url: string) => {
//         setLoading(true);
//         setError(null);
        
//         fetchMovies(url)
//             .then(data => {
//                 if (data) {
//                     setMovies(data);
//                     setError(null);
//                 }
//             })
//             .catch((err) => {
//                 setError(err instanceof Error ? err.message : 'Failed to fetch movies');
//                 setMovies([]);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, []);

//     useEffect(() => {
//        getMovies(url);
//     }, [url, getMovies]); // Include getMovies in dependency array

//     return { movies, loading, error };
// };

// export default useFetchMovies;
// // import { useState, useEffect } from 'react';
// // import { fetchMovies } from '../services/api';

// // const useFetchMovies = (url: string) => {
// //   const [movies, setMovies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     let isMounted = true; // Prevent state updates if unmounted

// //     async function loadMovies() {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         const data = await fetchMovies(url);
// //         if (isMounted) {
// //           setMovies(data || []);
// //         }
// //       } catch (err) {
// //         if (isMounted) {
// //           setError(
// //             err instanceof Error ? err.message : 'Failed to fetch movies'
// //           );
// //           setMovies([]);
// //         }
// //       } finally {
// //         if (isMounted) {
// //           setLoading(false);
// //         }
// //       }
// //     }

// //     loadMovies();

// //     return () => {
// //       isMounted = false; // cleanup
// //     };
// //   }, [url]);

// //   return { movies, loading, error };
// // };

// // export default useFetchMovies;


import { useState, useEffect, useCallback } from 'react';
import { fetchMovies } from '../services/api';
import type { Movie } from '../types/media.types';

const useFetchMovies = (url: string) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true); // Default to true to avoid sync setState
    const [error, setError] = useState<string | null>(null);

    const getMovies = useCallback(async (fetchUrl: string) => {
        // We don't call setLoading(true) here because the effect 
        // or the initial state already handles it.
        setError(null);
        
        try {
            const data = await fetchMovies(fetchUrl);
            if (data) {
                setMovies(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch movies');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Reset loading state only if it's not already loading
        // and handle the async side effect
        setLoading(true); 
        getMovies(url);
    }, [url, getMovies]);

    return { movies, loading, error };
};

export default useFetchMovies;