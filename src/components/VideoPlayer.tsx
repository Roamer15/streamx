interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  title: string;
}

const VideoPlayer = ({ isOpen, onClose, mediaUrl, title }: VideoPlayerProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-red-500 transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video Container */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="aspect-video">
            <iframe
              src={mediaUrl}
              className="w-full h-full"
              allowFullScreen
              title={title}
              allow="fullscreen; picture-in-picture"
            />
          </div>
        </div>

        {/* Title Below Player */}
        <div className="mt-4 text-center">
          <p className="text-white text-lg font-semibold">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
