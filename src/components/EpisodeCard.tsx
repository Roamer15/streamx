import type { TVEpisode } from "../hooks/useTV";
import { IMAGE_PATH } from "../services/api";

interface EpisodeProp {
  episode: TVEpisode;
  onPlayClick?: (episode: TVEpisode) => void;
}

export default function EpisodeCard({ episode, onPlayClick }: EpisodeProp) {
  return (
    <div
      key={episode.id}
      className="flex relative bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
      onClick={() => onPlayClick?.(episode)}
    >
      {episode.still_path && (
        <img
          src={`${IMAGE_PATH}${episode.still_path}`}
          alt={episode.name}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
        />
      )}

            <div className="absolute inset-0 bg-linear-to-r from-black via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />
      
      {/* Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-red-600 hover:bg-red-700 rounded-full p-3 transition-colors">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      <div className="p-4 absolute z-20">
        <div className="flex items-center justify-between mb-0 md:mb-2">
          <h3 className="text-white font-semibold text-sm sm:text-lg">
            Episode {episode.episode_number}
          </h3>
        </div>
        <p className="text-gray-300 font-medium md:font-semibold mb-2">
          {episode.name}
        </p>
      </div>
    </div>
  );
}
