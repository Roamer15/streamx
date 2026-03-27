import type { TVDetails } from "../hooks/useTV";
import { IMAGE_PATH } from "../services/api";

interface OverviewProp {
  tvDetails: TVDetails;
}

export default function TvOverview({ tvDetails }: OverviewProp) {
  return (
    <div className="px-6 md:px-14 py-10">
      <h2
        className="text-xl md:text-2xl font-extrabold text-white mb-3"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        Overview
      </h2>
      <p
        className="leading-relaxed max-w-4xl text-sm md:text-base"
        style={{ color: "#adaaaa" }}
      >
        {tvDetails.overview}
      </p>

      {tvDetails.created_by && tvDetails.created_by.length > 0 && (
        <div className="mt-8">
          <h3
            className="text-base font-bold text-white mb-2"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Created By
          </h3>
          <p className="text-sm" style={{ color: "#adaaaa" }}>
            {tvDetails.created_by.map((c) => c.name).join(", ")}
          </p>
        </div>
      )}

      {tvDetails.networks && tvDetails.networks.length > 0 && (
        <div className="mt-8">
          <h3
            className="text-base font-bold text-white mb-3"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Networks
          </h3>
          <div className="flex gap-3 flex-wrap">
            {tvDetails.networks.map((network) => (
              <div
                key={network.id}
                className="px-4 py-2 rounded-2xl flex items-center"
                style={{
                  background: "#1a1919",
                  border: "1px solid rgba(72,72,71,0.2)",
                }}
              >
                {network.logo_path ? (
                  <img
                    src={`${IMAGE_PATH}${network.logo_path}`}
                    alt={network.name}
                    className="h-7 object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                ) : (
                  <p className="text-sm text-white">{network.name}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
