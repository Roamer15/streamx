interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  title: string;
}

export const VideoPlayer = ({ isOpen, onClose, mediaUrl, title }: VideoPlayerProps) => {
  if (!isOpen) return null;

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