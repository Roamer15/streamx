import type { TVEpisode } from "../hooks/useTV";
import { IMAGE_PATH } from "../services/api";

interface EpisodeProp {
  episode: TVEpisode;
}

export default function EpisodeCard({ episode }: EpisodeProp) {
  return (
    <div
      key={episode.id}
      className="flex relative bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {episode.still_path && (
        <img
          src={`${IMAGE_PATH}${episode.still_path}`}
          alt={episode.name}
          className="w-full h-full object-cover opacity-60"
        />
      )}

            <div className="absolute inset-0 bg-linear-to-r from-black via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />
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
