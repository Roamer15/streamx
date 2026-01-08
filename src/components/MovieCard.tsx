import { memo, useCallback } from "react";
import { IMAGE_PATH } from "../services/api";
import { type Movie } from "../types/media.types";

interface MovieCardProps {
  movie: Movie & { media_type?: string };
  width?: string;
  onMovieClick?: (movie: Movie & { media_type?: string }) => void;
}

const MovieCard = memo(
  ({ movie, width = "w-27 md:w-45", onMovieClick }: MovieCardProps) => {
    const handleClick = useCallback(() => {
      onMovieClick?.(movie);
    }, [movie, onMovieClick]);

    const title = movie.title ? movie.title : movie.name;
    const finalImagePath = movie.poster_path? movie.poster_path : movie.backdrop_path

    return (
      <div
        onClick={handleClick}
        className={`${width} shrink-0 group cursor-pointer transition-transform duration-300 hover:scale-105`}
      >
        {/* Movie Poster Card */}
        <div className="relative h-52 md:h-65 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img
            src={`${IMAGE_PATH}${finalImagePath}` || 'https://as1.ftcdn.net/jpg/01/98/91/58/1000_F_198915813_Ad1GiheMzaJU9tN8xPbonxTvr9UDeOJe.webp'}
            alt={title}
            className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
          />

          {/* Gradient Overlay for Title */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Title at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black to-transparent">
            <p className="text-white text-sm font-semibold leading-tight line-clamp-2 group-hover:line-clamp-none">
              {title}
            </p>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    );
  }
);

MovieCard.displayName = "MovieCard";

export default MovieCard;
