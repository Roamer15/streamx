import type { Movie } from "../types/media.types";
import { useNavigate } from "react-router";
import MovieCard from "../components/MovieCard";
import { API_KEY, BASE_URL } from "../services/api";
import useFetchMovies from "../hooks/useFetchMovies";

export default function Series() {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}`
 const {movies, error, loading, totalPages, currentPage, goToPage } = useFetchMovies(url);
 const navigate = useNavigate()
 
 return (
     <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
       <div className="max-w-7xl mx-auto">
         {/* Loading State */}
         {loading && (
           <div className="flex justify-center items-center min-h-96">
             <div className="text-center">
               <div className="inline-block animate-spin mb-4">
                 <svg
                   className="w-12 h-12 text-red-500"
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                 >
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                   />
                 </svg>
               </div>
               <p className="text-gray-400">Searching...</p>
             </div>
           </div>
         )}
 
         {/* Error State */}
         {error && (
           <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-400 mb-8">
             <p>Error: {error}</p>
           </div>
         )}
 
         {/* Results Grid */}
         {!loading && movies.length > 0 ? (
           <div>
             <p className="text-gray-400 mb-6">
               Page {currentPage} of {totalPages} - Found {movies.length} result{movies.length !== 1 ? 's' : ''} on this page
             </p>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
               {movies.map((movie: Movie & { media_type?: string }) => (
                 <div
                   key={movie.id}
                   onClick={() => {
                      navigate(`/details/tv/${movie.id}`);
                   }}
                   className="cursor-pointer group"
                 >
                   <MovieCard movie={movie} width='md:w-54'
                   />
                 </div>
               ))}
             </div>
 
             {/* Pagination Controls */}
             {totalPages > 1 && (
               <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                 <button
                   onClick={() => goToPage(currentPage - 1)}
                   disabled={currentPage === 1}
                   className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                 >
                   ← Previous
                 </button>
 
                 <div className="flex items-center gap-2">
                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                     let pageNum;
                     if (totalPages <= 5) {
                       pageNum = i + 1;
                     } else if (currentPage <= 3) {
                       pageNum = i + 1;
                     } else if (currentPage >= totalPages - 2) {
                       pageNum = totalPages - 4 + i;
                     } else {
                       pageNum = currentPage - 2 + i;
                     }
                     return (
                       <button
                         key={pageNum}
                         onClick={() => goToPage(pageNum)}
                         className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                           currentPage === pageNum
                             ? 'bg-red-600 text-white'
                             : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                         }`}
                       >
                         {pageNum}
                       </button>
                     );
                   })}
                 </div>
 
                 <button
                   onClick={() => goToPage(currentPage + 1)}
                   disabled={currentPage === totalPages}
                   className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                 >
                   Next →
                 </button>
               </div>
             )}
           </div>
         ) : null}
       </div>
     </div>
   ); 
}