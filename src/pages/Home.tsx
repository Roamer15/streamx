import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import { BASE_URL, API_KEY } from "../services/api";
import { useContext } from "react";
import { DetailMovieContext } from "../context/SideBarContextLine";
import { useNavigate } from "react-router";
import type { Movie } from "../types/media.types";

export default function Home() {
  const latestMoviesUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;
  const trendingMoviesUrl = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  const latestSeriesUrl = `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`;
  const TopMoviesUrl = `${BASE_URL}/movie/top_rated?page=1&api_key=${API_KEY}`;
  const TopSeriesUrl = `${BASE_URL}/tv/top_rated?api_key=${API_KEY}`;
  const animeUrl = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja`;
  const kDramaUrl = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=ko&with_genres=18`;
  const bollywoodUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&region=IN`; //Try something
  const animationUrl = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`;
  const martialArtUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&region=CN&with_original_language=cn`;

  const context = useContext(DetailMovieContext);
  if (!context) {
    throw new Error("DetailMovieContext must be used within a provider");
  }
  const { setSelectedMovie } = context;
  const navigate = useNavigate();

  const handleNavigationToDetailPage = (movie: Movie) => {
    setSelectedMovie(movie);
    navigate(`/details/${movie.id}`);
  };

  return (
    <>
      <Hero />

      <Carousel
        title="Trending Now"
        url={trendingMoviesUrl}
        onMovieClick={handleNavigationToDetailPage}
      />
      <Carousel
        title="Latest Movies"
        url={latestMoviesUrl}
        onMovieClick={handleNavigationToDetailPage}
      />
      <Carousel
        title="Latest Series"
        url={latestSeriesUrl}
        onMovieClick={handleNavigationToDetailPage}
      />
      <Carousel
        title="Top Rated Movies"
        url={TopMoviesUrl}
        onMovieClick={handleNavigationToDetailPage}
      />
      <Carousel
        title="Top Rated Series"
        url={TopSeriesUrl}
        onMovieClick={handleNavigationToDetailPage}
      />
      <Carousel
        title="Anime"
        url={animeUrl}
        onMovieClick={handleNavigationToDetailPage}
      />
      <Carousel
        title="K Drama"
        url={kDramaUrl}
        onMovieClick={handleNavigationToDetailPage}
      />
      <Carousel
        title="Bollywood"
        url={bollywoodUrl}
        onMovieClick={handleNavigationToDetailPage}
      />
      <Carousel
        title="Animation"
        url={animationUrl}
        onMovieClick={handleNavigationToDetailPage}
      />
      <Carousel
        title="Martial Arts"
        url={martialArtUrl}
        onMovieClick={handleNavigationToDetailPage}
      />
    </>
  );
}
