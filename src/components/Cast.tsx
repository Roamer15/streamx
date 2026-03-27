import type { Cast } from "../pages/DetailsPage";
import { IMAGE_PATH } from "../services/api";

interface CastProp {
  actor: Cast;
}

export default function Cast({ actor }: CastProp) {
  return (
    <div className="group cursor-pointer transition-transform duration-300 hover:scale-105 text-center">
      {/* Avatar */}
      <div
        className="relative mx-auto mb-3 overflow-hidden"
        style={{
          width: "clamp(64px, 10vw, 88px)",
          height: "clamp(64px, 10vw, 88px)",
          borderRadius: "999px",
          background: "#1a1919",
          border: "2px solid rgba(72,72,71,0.2)",
        }}
      >
        {actor.profile_path ? (
          <img
            src={`${IMAGE_PATH}${actor.profile_path}`}
            alt={actor.name}
            className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "#262626" }}
          >
            <svg
              className="w-6 h-6"
              style={{ color: "#484847" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Name */}
      <h3
        className="text-white font-semibold text-xs truncate"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {actor.name}
      </h3>
      <p className="text-xs truncate mt-0.5" style={{ color: "#adaaaa" }}>
        {actor.character}
      </p>
    </div>
  );
}
