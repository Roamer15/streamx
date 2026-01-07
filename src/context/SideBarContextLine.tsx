import { createContext } from "react";
import type { Movie } from "../types/media.types";

interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

interface DetailMovieContextType {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
export const DetailMovieContext = createContext<DetailMovieContextType | undefined>(undefined);
