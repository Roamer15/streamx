import { Link, useLocation } from "react-router";
import { useSidebar } from "../hooks/useSidebar";
import React from "react";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const location = useLocation();

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: "M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4",
    },
    {
      label: "Movies",
      path: "/movies",
      icon: "M2 18V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2zM2 9h20M7 4l2 5M12 4l2 5M17 4l2 5",
    },
    {
      label: "Series",
      path: "/series",
      icon: "M7 21h10m-5-3v3m9-9a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v5zM9 2l3 3m3-3l-3 3",
    },
    {
      label: "Favourites",
      path: "/favourites",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
  ];

  return (
    <>
      {/* Sidebar Overlay (for mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 text-white transform transition-all duration-300 z-40 pt-16 md:pt-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="mt-6 space-y-2 px-3 overflow-y-auto h-full">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${
                  isActive
                    ? "bg-red-600 text-white font-semibold"
                    : "hover:bg-gray-800 text-gray-200"
                }`}
                onClick={closeSidebar}
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default React.memo(Sidebar);
