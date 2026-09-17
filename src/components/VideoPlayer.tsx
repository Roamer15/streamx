import { useMemo, useState } from "react";
import { embedProviders, DEFAULT_PROVIDER_ID } from "../services/embedProviders";
import { IMAGE_PATH } from "../services/api";

interface VideoPlayerProps {
  isPlaying: boolean;
  onPlayClick: () => void;
  backdropImage: string;
  title: string;
  mediaType: 'movie' | 'tv';
  tmdbId: string;
  season?: number;
  episode?: number;
}

const PREFERRED_PROVIDER_STORAGE_KEY = "preferredEmbedProvider";

const getInitialProviderId = () => {
  const stored = localStorage.getItem(PREFERRED_PROVIDER_STORAGE_KEY);
  if (stored && embedProviders.some((provider) => provider.id === stored)) {
    return stored;
  }
  return DEFAULT_PROVIDER_ID;
};

export const VideoPlayer = ({
  isPlaying,
  onPlayClick,
  backdropImage,
  title,
  mediaType,
  tmdbId,
  season,
  episode,
}: VideoPlayerProps) => {
  const [selectedProviderId, setSelectedProviderId] = useState(getInitialProviderId);

  const mediaUrl = useMemo(() => {
    const provider = embedProviders.find((p) => p.id === selectedProviderId) ?? embedProviders[0];
    if (mediaType === "movie") {
      return provider.getMovieUrl(tmdbId);
    }
    return provider.getTvUrl(tmdbId, season ?? 1, episode ?? 1);
  }, [selectedProviderId, mediaType, tmdbId, season, episode]);

  const handleSelectProvider = (id: string) => {
    setSelectedProviderId(id);
    localStorage.setItem(PREFERRED_PROVIDER_STORAGE_KEY, id);
  };

  return (
    <div>
      <div
        className="relative w-full aspect-video overflow-hidden bg-black"
        style={{ borderRadius: "32px" }}
      >
        {isPlaying ? (
          <iframe
            src={mediaUrl}
            className="w-full h-full border-0"
            allowFullScreen
            title={title}
            referrerPolicy="origin"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          />
        ) : (
          <>
            <img
              src={`${IMAGE_PATH}${backdropImage}`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.5)" }}
            />
            <button
              onClick={onPlayClick}
              className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
              aria-label={`Play ${title}`}
            >
              <span
                className="flex items-center justify-center rounded-full transition-transform hover:scale-110"
                style={{
                  width: "88px",
                  height: "88px",
                  background: "linear-gradient(135deg, #ff8d8f 0%, #e9003a 100%)",
                }}
              >
                <svg className="w-8 h-8 fill-black" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>

      {isPlaying && (
        <div className="flex flex-wrap items-center gap-2 mt-3 px-1">
          {embedProviders.map((provider) => {
            const isActive = provider.id === selectedProviderId;
            return (
              <button
                key={provider.id}
                onClick={() => handleSelectProvider(provider.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive ? "text-black" : "text-white/80 bg-black/20 hover:bg-white/10"
                }`}
                style={
                  isActive
                    ? { background: "linear-gradient(135deg, #ff8d8f 0%, #e9003a 100%)" }
                    : undefined
                }
              >
                {provider.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
