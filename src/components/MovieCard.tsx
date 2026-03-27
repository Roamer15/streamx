import { memo, useCallback } from "react";
import { IMAGE_PATH } from "../services/api";
import { type Movie } from "../types/media.types";

interface MovieCardProps {
  movie: Movie & { media_type?: string };
  width?: string;
  onMovieClick?: (movie: Movie & { media_type?: string }) => void;
}

const MovieCard = memo(
  ({ movie, width = "w-32 md:w-44", onMovieClick }: MovieCardProps) => {
    const handleClick = useCallback(() => {
      onMovieClick?.(movie);
    }, [movie, onMovieClick]);

    const title = movie.title ?? movie.name ?? "";
    const finalImagePath = movie.poster_path ?? movie.backdrop_path;

    return (
      <div
        onClick={handleClick}
        className={`${width} shrink-0 group cursor-pointer`}
        style={{ transition: "transform 0.3s ease" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.05)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
      >
        {/* Card shell */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "16px",
            aspectRatio: "2/3",
            background: "#1a1919",
            boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
          }}
        >
          {/* Poster image */}
          <img
            src={
              finalImagePath
                ? `${IMAGE_PATH}${finalImagePath}`
                : "https://as1.ftcdn.net/jpg/01/98/91/58/1000_F_198915813_Ad1GiheMzaJU9tN8xPbonxTvr9UDeOJe.webp"
            }
            alt={title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-75"
          />

          {/* Permanent bottom gradient for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 35%, transparent 60%)",
            }}
          />

          {/* Rating badge — always visible, top-right */}
          <div
            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
            style={{
              background: "rgba(14,14,14,0.75)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#ff8d8f",
            }}
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {movie.vote_average.toFixed(1)}
          </div>

          {/* Title — anchored to bottom, overlapping edge */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p
              className="text-white text-xs font-semibold leading-snug line-clamp-2"
              style={{ fontFamily: "'Manrope', sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
            >
              {title}
            </p>
          </div>

          {/* Hover overlay — quick-action hint */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div
              className="p-3 rounded-full"
              style={{
                background: "linear-gradient(135deg, #ff8d8f 0%, #e9003a 100%)",
                boxShadow: "0 0 24px rgba(233,0,58,0.5)",
              }}
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MovieCard.displayName = "MovieCard";

export default MovieCard;
