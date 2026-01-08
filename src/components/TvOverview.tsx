import type { TVDetails } from "../hooks/useTV"
import { IMAGE_PATH } from "../services/api"

interface OverviewProp {
    tvDetails: TVDetails;
}

export default function TvOverview({tvDetails}: OverviewProp) {
    return (
        <div className="px-4 md:px-8 lg:px-14 py-5 md:py-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Overview</h2>
                <p className="text-gray-300 leading-relaxed max-w-6xl">{tvDetails.overview}</p>
        
                {tvDetails.created_by && tvDetails.created_by.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-1 md:mb-2">Created By</h3>
                    <p className="text-gray-400">{tvDetails.created_by.map((creator) => creator.name).join(', ')}</p>
                  </div>
                )}
        
                {tvDetails.networks && tvDetails.networks.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-1 md:mb-2">Networks</h3>
                    <div className="flex gap-4 flex-wrap">
                      {tvDetails.networks.map((network) => (
                        <div key={network.id} className="bg-gray-800 px-4 py-2 rounded">
                          {network.logo_path ? (
                            <img
                              src={`${IMAGE_PATH}${network.logo_path}`}
                              alt={network.name}
                              className="h-8 object-contain"
                            />
                          ) : (
                            <p className="text-gray-300">{network.name}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
    )
}