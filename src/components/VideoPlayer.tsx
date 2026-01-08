interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  title: string;
}

const VideoPlayer = ({
  isOpen,
  onClose,
  mediaUrl,
  title,
}: VideoPlayerProps) => {
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
              // sandbox="allow-scripts"
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

// import { useEffect } from "react";

// interface VideoPlayerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   mediaUrl: string;
//   title: string;
// }

// const VideoPlayer = ({
//   isOpen,
//   onClose,
//   mediaUrl,
//   title,
// }: VideoPlayerProps) => {
//   // Prevent redirection attempts from hijacking the main window
//   useEffect(() => {
//   if (!isOpen) return;

//   // If the page tries to hide (redirect), we try to stop it
//   const handleVisibilityChange = () => {
//     if (document.visibilityState === 'hidden') {
//       // Some browsers allow you to trigger a tiny alert or 
//       // logic here to interfere with the redirect
//       console.log("Redirect attempt detected");
//     }
//   };

//   // The 'pagehide' event is more modern than 'unload'
//   const handlePageHide = (e: PageTransitionEvent) => {
//     // If the navigation is forced, this might give the user 
//     // a chance to hit the 'Back' button or stay put.
//     // Note: Browsers are strict here, but it adds a layer of friction.
//   };

//   document.addEventListener("visibilitychange", handleVisibilityChange);
//   window.addEventListener("pagehide", handlePageHide);

//   return () => {
//     document.removeEventListener("visibilitychange", handleVisibilityChange);
//     window.removeEventListener("pagehide", handlePageHide);
//   };
// }, [isOpen]);  if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-0 md:p-4 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <div
//         className="w-full max-w-6xl relative animate-in fade-in zoom-in duration-300"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute -top-12 right-4 md:right-0 text-white/70 hover:text-white transition-colors p-2"
//           aria-label="Close player"
//         >
//           <svg
//             className="w-8 h-8"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         {/* Video Container */}
//         <div className="bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10">
//           <div className="aspect-video">
//             <iframe
//               src={mediaUrl}
//               // Added 'allow-forms' as some players need it for internal settings
//               // Omitted 'allow-top-navigation' and 'allow-popups' to block redirects
//             //   sandbox="allow-forms allow-scripts allow-same-origin allow-presentation allow-top-navigation-by-user-activation"
//               className="w-full h-full"
//               allowFullScreen
//               title={title}
//               // Explicitly allowing features needed for a good streaming experience
//               allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
//             />
//           </div>
//         </div>

//         {/* Title Below Player */}
//         <div className="mt-4 text-center px-4">
//           <p className="text-white text-lg font-medium tracking-wide drop-shadow-md">
//             {title}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
