import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import ContinueWatchingRow from "../components/ContinueWatchingRow";
import { useContext } from "react";
import { DetailMovieContext } from "../context/SideBarContextLine";
import { useNavigate } from "react-router";
import type { Movie } from "../types/media.types";
import SEO from "../components/SEO";
import { CATEGORIES, type MediaType } from "../data/catalog";

export default function Home() {
  const context = useContext(DetailMovieContext);
  if (!context) {
    throw new Error("DetailMovieContext must be used within a provider");
  }
  const { setSelectedMovie } = context;
  const navigate = useNavigate();

  const handleMovieClick = (
    movie: Movie & { media_type?: string },
    mediaType: MediaType
  ) => {
    if (mediaType === "movie") {
      setSelectedMovie(movie);
      // Detect if it's TV based on media_type property or if explicitly passed
      const resolvedMediaType = movie.media_type === "tv" ? "tv" : "movie";
      navigate(`/details/${resolvedMediaType}/${movie.id}`);
      return;
    }

    navigate(`/details/tv/${movie.id}`);
  };

  return (
    <>
      <SEO
        title="ChwiiX - Discover Movies & TV Shows"
        description="Browse trending, latest, and top-rated movies and TV shows across every genre. Watch anime, K-drama, Bollywood, and more on ChwiiX."
      />
      <Hero />

      <ContinueWatchingRow />

      {CATEGORIES.map((category) => (
        <Carousel
          key={category.slug}
          category={category}
          onMovieClick={(movie) => handleMovieClick(movie, category.mediaType)}
        />
      ))}
    </>
  );
}
