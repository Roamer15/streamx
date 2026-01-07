import { useState, type ReactNode } from "react";
import { DetailMovieContext } from "./SideBarContextLine";
import type { Movie } from "../types/media.types";

export function DetailMovieProvider({ children }: { children: ReactNode }) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <DetailMovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </DetailMovieContext.Provider>
  );
}
