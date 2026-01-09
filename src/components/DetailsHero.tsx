import { IMAGE_PATH } from "../services/api";
import type { Movie } from "../types/media.types";

interface DetailsHero {
  selectedMovie: Movie;
  backdropImage: string;
  runtime: number | null;
  releaseYear: string;
  handleToggleFavourites: () => void;
  isInFavourites: boolean;
  onPlayClick?: () => void;
}

export default function DetailsHero({
  selectedMovie, backdropImage, runtime, releaseYear, handleToggleFavourites, isInFavourites, onPlayClick}: DetailsHero) {
  return (
    <div className="relative h-100 md:h-175 overflow-hidden">
      {/* Backdrop Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGE_PATH}${backdropImage})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-end px-4 md:px-8 lg:px-16 pb-4 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-6xl font-bold text-white mb-2 md:mb-4">
            {selectedMovie?.title}
          </h1>

          {/* Movie Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-6">
            <div className="bg-red-600 px-2 md:px-4 py-1 md:py-2 rounded-full">
              <span className="text-white font-bold text-sm md:text-lg">
                {selectedMovie?.vote_average.toFixed(1)}/10
              </span>
            </div>
            <span className="text-gray-300 text-sm md:text-base">
              {releaseYear}
            </span>
            {runtime && (
              <span className="text-gray-300 text-sm md:text-base">
                {runtime} min
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
            {selectedMovie?.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={onPlayClick}
              className="bg-red-600 hover:bg-red-700 text-white px-2 md:px-8 py-2 sm:text-sm md:py-3 rounded-lg cursor-pointer font-semibold transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Now
            </button>

            <button
              onClick={handleToggleFavourites}
              className={`${
                isInFavourites
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-700 hover:bg-gray-600"
              } text-white px-2 md:px-8 py-2 md:py-3 sm:text-sm rounded-lg cursor-pointer font-semibold transition-colors flex items-center gap-2`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={isInFavourites ? "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" : "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"} />
              </svg>
              {isInFavourites ? "Remove from Favourites" : "Add to Favourites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
