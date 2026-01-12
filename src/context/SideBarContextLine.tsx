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

interface FeedbackContextType {
  isFeedbackModalOpen: boolean;
  openFeedbackModal: () => void;
  closeFeedbackModal: () => void;
}


export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
export const DetailMovieContext = createContext<DetailMovieContextType | undefined>(undefined);

export const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);
