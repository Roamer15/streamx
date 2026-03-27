import type { TVEpisode } from "../hooks/useTV";
import { IMAGE_PATH } from "../services/api";

interface EpisodeProp {
  episode: TVEpisode;
  onPlayClick?: (episode: TVEpisode) => void;
}

export default function EpisodeCard({ episode, onPlayClick }: EpisodeProp) {
  return (
    <div
      className="relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105"
      style={{
        borderRadius: "16px",
        background: "#1a1919",
        aspectRatio: "16/9",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
      onClick={() => onPlayClick?.(episode)}
    >
      {/* Still image */}
      {episode.still_path && (
        <img
          src={`${IMAGE_PATH}${episode.still_path}`}
          alt={episode.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:brightness-50"
          style={{ opacity: 0.7 }}
        />
      )}

      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
        }}
      />

      {/* Play button on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

      {/* Episode info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <p
          className="text-xs font-bold mb-0.5"
          style={{ color: "#ff8d8f", fontFamily: "'Manrope', sans-serif" }}
        >
          Ep {episode.episode_number}
        </p>
        <p className="text-white text-xs font-semibold line-clamp-1">
          {episode.name}
        </p>
      </div>
    </div>
  );
}
