import { Link, useNavigate, useLocation } from "react-router";
import { useSidebar } from "../hooks/useSidebar";
import { useCallback, useRef, useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import type { Movie } from "../types/media.types";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { results, loading, searchQuery, setSearchQuery, clearSearch } = useSearch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const showDropdown = searchQuery.trim().length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // no-op: dropdown closes when query clears
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
    if (result.media_type === "tv") {
      navigate(`/details/tv/${result.id}`);
    } else {
      navigate(`/details/movie/${result.id}`);
    }
    clearSearch();
  }, [navigate, clearSearch]);

  const navLinks = [
    { label: "Movies", path: "/movies" },
    { label: "Series", path: "/series" },
    { label: "Favourites", path: "/favourites" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(19, 19, 19, 0.70)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex items-center gap-6 px-4 md:px-8 lg:px-14 py-3.5">
        {/* Hamburger — mobile only */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-full text-on-surface-variant hover:text-white transition-colors shrink-0 cursor-pointer"
          title="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <span
            className="text-xl md:text-2xl font-extrabold tracking-tight font-display"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <span style={{ color: "#ffffff" }}>Chwii</span>
            <span style={{ color: "#ff8d8f" }}>X</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-3 py-1.5 text-sm font-medium transition-colors"
                style={{ color: isActive ? "#ffffff" : "#adaaaa" }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: "#ff8d8f" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xs ml-auto md:ml-0">
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-sm text-white placeholder-on-surface-variant rounded-lg focus:outline-none transition-all"
              style={{
                background: "#201f1f",
                border: "1px solid rgba(72,72,71,0.2)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 2px rgba(233,0,58,0.08)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary-ruby transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Search Dropdown */}
            {showDropdown && (
              <div
                className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto scrollbar-custom"
                style={{ background: "#1a1919", border: "1px solid rgba(72,72,71,0.15)" }}
              >
                {loading ? (
                  <div className="px-4 py-6 text-center text-on-surface-variant">
                    <svg className="w-5 h-5 animate-spin mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                ) : results.length > 0 ? (
                  results.slice(0, 8).map((result: Movie & { media_type?: string }) => (
                    <div
                      key={result.id}
                      onClick={() => handleSelectResult(result)}
                      className="px-4 py-3 cursor-pointer transition-colors flex gap-3 items-start hover:bg-[#262626]"
                    >
                      {result.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                          alt={result.title}
                          className="w-9 h-14 object-cover rounded-lg shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate text-sm">
                          {result.title || result.name}
                        </p>
                        <p className="text-[#adaaaa] text-xs mt-0.5">
                          {result.release_date ? new Date(result.release_date).getFullYear() : "N/A"}
                        </p>
                        {result.vote_average > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            <span style={{ color: "#ff8d8f" }} className="text-xs">★</span>
                            <span className="text-[#adaaaa] text-xs">{result.vote_average.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-on-surface-variant text-sm">No results found</div>
                )}
              </div>
            )}
          </div>
        </form>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {user ? (
            <>
              <span className="text-on-surface-variant text-xs truncate max-w-32">{user.email}</span>
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-white rounded-full transition-colors ghost-border"
                style={{ border: "1px solid rgba(72,72,71,0.3)" }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 text-sm font-bold text-white rounded-full transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #ff8d8f 0%, #e9003a 100%)" }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
