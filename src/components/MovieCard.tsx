import { IMAGE_PATH } from "../services/api";
import { type Movie } from "../types/media.types";

interface MovieCardProps {
  movie: Movie;
  width?: string;
  onMovieClick?: (movie: Movie) => void;
}

const MovieCard = ({ movie, width = "w-27 md:w-45", onMovieClick }: MovieCardProps) => {
  return (
    <div
      onClick={() => onMovieClick?.(movie)}
      className={`${width} shrink-0 group cursor-pointer transition-transform duration-300 hover:scale-105`}
    >
      {/* Movie Poster Card */}
      <div className="relative h-52 md:h-65 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
        />

        {/* Gradient Overlay for Title */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Title at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black to-transparent">
          <p className="text-white text-sm font-semibold leading-tight line-clamp-2 group-hover:line-clamp-none">
            {movie.title}
          </p>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;