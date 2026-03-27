import { IMAGE_PATH } from "../services/api";
import { type TVDetails } from "../hooks/useTV";
import { useEffect, useState } from "react";

interface TvHeroProps {
  tvDetails: TVDetails;
  backdropImage: string;
  firstAirYear: string;
  isInFavourites?: boolean;
  onToggleFavourites?: () => void;
  onPlayClick?: () => void;
}

export default function TvHero({
  tvDetails,
  backdropImage,
  firstAirYear,
  isInFavourites = false,
  onToggleFavourites,
  onPlayClick,
}: TvHeroProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.matchMedia("(max-width: 480px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 480px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(420px, 70vh, 680px)" }}
    >
      {/* Backdrop */}
      {backdropImage && (
        <img
          src={`${IMAGE_PATH}${backdropImage}`}
          alt={tvDetails.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
      )}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(14,14,14,0.97) 0%, rgba(14,14,14,0.65) 55%, rgba(14,14,14,0.15) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(14,14,14,1) 0%, rgba(14,14,14,0.3) 35%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-end px-6 md:px-14 pb-10 md:pb-14">
        <div className="flex gap-6 md:gap-10 items-end w-full max-w-5xl">
          {/* Poster thumbnail */}
          {tvDetails.poster_path && (
            <img
              src={`${IMAGE_PATH}${tvDetails.poster_path}`}
              alt={tvDetails.name}
              className="hidden md:block w-36 shrink-0 object-cover"
              style={{
                borderRadius: "16px",
                aspectRatio: "2/3",
                boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              }}
            />
          )}

          <div className="flex-1 pb-1">
            {/* Meta pills */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span
                className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,141,143,0.12)",
                  color: "#ff8d8f",
                  border: "1px solid rgba(255,141,143,0.25)",
                }}
              >
                {firstAirYear}
              </span>
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: "rgba(38,38,38,0.6)",
                  color: "#adaaaa",
                  border: "1px solid rgba(72,72,71,0.2)",
                }}
              >
                {tvDetails.number_of_seasons} Season
                {tvDetails.number_of_seasons !== 1 ? "s" : ""}
              </span>
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: "rgba(38,38,38,0.6)",
                  color: "#adaaaa",
                  border: "1px solid rgba(72,72,71,0.2)",
                }}
              >
                {tvDetails.status}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-black leading-tight tracking-tight mb-3"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)",
                color: "#ffffff",
                textShadow: "0 4px 24px rgba(0,0,0,0.6)",
              }}
            >
              {tvDetails.name}
            </h1>

            {/* Genres + Rating row */}
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <span
                className="flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,141,143,0.1)",
                  color: "#ff8d8f",
                }}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {tvDetails.vote_average.toFixed(1)}
              </span>
              <span className="text-sm" style={{ color: "#adaaaa" }}>
                {tvDetails.genres.map((g) => g.name).join(" · ")}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={onPlayClick}
                className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #ff8d8f 0%, #e9003a 100%)",
                  color: "#000000",
                  boxShadow: "0 8px 24px rgba(233,0,58,0.35)",
                }}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                {isMobile ? "Play" : "Play Now"}
              </button>

              <button
                onClick={onToggleFavourites}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:opacity-90"
                style={
                  isInFavourites
                    ? {
                        background: "rgba(255,141,143,0.15)",
                        color: "#ff8d8f",
                        border: "1px solid rgba(255,141,143,0.35)",
                      }
                    : {
                        background: "rgba(38,38,38,0.55)",
                        backdropFilter: "blur(20px)",
                        color: "#adaaaa",
                        border: "1px solid rgba(72,72,71,0.25)",
                      }
                }
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isMobile
                  ? isInFavourites ? "Fav'd" : "Save"
                  : isInFavourites ? "In Favourites" : "Add to Favourites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
