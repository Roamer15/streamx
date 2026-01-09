import { Link, useNavigate } from "react-router";
import { useSidebar } from "../hooks/useSidebar";
import { useCallback, useRef, useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import type { Movie } from "../types/media.types";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { results, loading, searchQuery, setSearchQuery, clearSearch } = useSearch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const showDropdown = searchQuery.trim().length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Dropdown will close when searchQuery is empty
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      clearSearch();
    }
  }, [searchQuery, navigate, clearSearch]);

  const handleSelectResult = useCallback((result: Movie & { media_type?: string }) => {
    if (result.media_type === 'tv') {
      navigate(`/details/tv/${result.id}`);
    } else {
      navigate(`/details/movie/${result.id}`);
    }
    clearSearch();
  }, [navigate, clearSearch]);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-gray-900 text-white border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center gap-4 px-4 md:px-6 py-3 md:py-4">
          {/* Left: Hamburger Icon */}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white shrink-0 cursor-pointer"
            title="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Center: Logo */}
          <Link to="/" className="shrink-0">
            <div className="text-lg md:text-2xl font-bold bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
              ChwiiX
            </div>
          </Link>

          {/* Right: Search Bar */}
          <form onSubmit={handleSearch} className="flex-2 md:flex-none">
            <div className="relative w-full md:w-100" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Search Movies, Series, TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 text-sm"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Search Dropdown Modal */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto scrollbar-custom">
                  {loading ? (
                    <div className="px-4 py-6 text-center text-gray-400">
                      <div className="inline-block animate-spin">
                        <svg
                          className="w-5 h-5"
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
                    </div>
                  ) : results.length > 0 ? (
                    results.slice(0, 8).map((result: Movie & { media_type?: string }) => (
                      <div
                        key={result.id}
                        onClick={() => handleSelectResult(result)}
                        className="px-4 py-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors"
                      >
                        <div className="flex gap-3 items-start">
                          {result.poster_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                              alt={result.title}
                              className="w-10 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate text-sm">
                              {result.title || result.name}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {result.release_date ? new Date(result.release_date).getFullYear() : 'N/A'}
                            </p>
                            {result.vote_average > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-yellow-500 text-xs">★</span>
                                <span className="text-gray-300 text-xs">
                                  {result.vote_average.toFixed(1)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-400">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
