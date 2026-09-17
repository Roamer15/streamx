import { useMemo, useState } from "react";
import { embedProviders, DEFAULT_PROVIDER_ID } from "../services/embedProviders";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
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

export const VideoPlayer = ({ isOpen, onClose, title, mediaType, tmdbId, season, episode }: VideoPlayerProps) => {
  const [selectedProviderId, setSelectedProviderId] = useState(getInitialProviderId);

  const mediaUrl = useMemo(() => {
    const provider = embedProviders.find((p) => p.id === selectedProviderId) ?? embedProviders[0];
    if (mediaType === "movie") {
      return provider.getMovieUrl(tmdbId);
    }
    return provider.getTvUrl(tmdbId, season ?? 1, episode ?? 1);
  }, [selectedProviderId, mediaType, tmdbId, season, episode]);

  if (!isOpen) return null;

  const handleSelectProvider = (id: string) => {
    setSelectedProviderId(id);
    localStorage.setItem(PREFERRED_PROVIDER_STORAGE_KEY, id);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex flex-col items-center justify-center backdrop-blur-md"
      onClick={onClose}
    >
      {/* Top Bar for Mobile - Always visible to ensure user can escape */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-linear-to-b from-black/80 to-transparent">
        <p className="text-white font-medium truncate pr-10 text-sm md:text-lg">
          {title}
        </p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-2 rounded-full bg-black/20 hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        className="w-full max-w-6xl md:max-w-7xl md:px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Server switcher */}
        <div className="flex flex-wrap items-center gap-2 mb-3 px-1">
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

        {/* Video Wrapper */}
        <div className="bg-black shadow-2xl relative group">
          <div className="aspect-video w-full">
            <iframe
              src={mediaUrl}
              className="w-full h-full border-0"
              allowFullScreen
              title={title}
              referrerPolicy="origin"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            />
          </div>
        </div>

        {/* Desktop Title (Hidden on small mobile as it's in the top bar) */}
        <div className="hidden md:block mt-6 text-center">
          <h2 className="text-white text-xl font-semibold tracking-wide">{title}</h2>
          <p className="text-gray-400 text-sm mt-1">Now Streaming on ChwiiX</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
