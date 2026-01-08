import type { TVEpisode } from "../hooks/useTV";
import { IMAGE_PATH } from "../services/api";

interface EpisodeProp {
  episode: TVEpisode;
}

export default function EpisodeCard({ episode }: EpisodeProp) {
  return (
    <div
      key={episode.id}
      className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {episode.still_path && (
        <img
          src={`${IMAGE_PATH}${episode.still_path}`}
          alt={episode.name}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold text-lg">
            Episode {episode.episode_number}
          </h3>
          <span className="text-yellow-500">
            ★ {episode.vote_average.toFixed(1)}
          </span>
        </div>
        <p className="text-gray-300 font-semibold mb-2">{episode.name}</p>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {episode.overview}
        </p>
        <p className="text-gray-500 text-xs">{episode.air_date}</p>

        {episode.guest_stars && episode.guest_stars.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-gray-400 text-xs mb-1">Guest Stars:</p>
            <p className="text-gray-300 text-xs">
              {episode.guest_stars
                .slice(0, 2)
                .map((star) => star.name)
                .join(", ")}
              {episode.guest_stars.length > 2 &&
                ` +${episode.guest_stars.length - 2}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
