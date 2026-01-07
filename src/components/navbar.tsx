import { Link, useNavigate } from "react-router";
import { useSidebar } from "../hooks/useSidebar";
import { useState, useCallback } from "react";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery, navigate]);

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
              StreamX
            </div>
          </Link>

          {/* Right: Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 md:flex-none">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 text-sm"
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
            </div>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
