import { IMAGE_PATH } from "../services/api"
import { type TVDetails } from "../hooks/useTV"

interface tvHeroProps {
    tvDetails: TVDetails;
    backdropImage: string;
    firstAirYear: string;
}

export default function TvHero({tvDetails, backdropImage, firstAirYear}: tvHeroProps) {
    return (
        <div className="relative h-96 md:h-115 w-full overflow-hidden">
                {backdropImage && (
                  <>
                    <img
                      src={`${IMAGE_PATH}${backdropImage}`}
                      alt={tvDetails.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/50 to-transparent" />
                  </>
                )}
        
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end px-4 md:px-8 lg:px-16 py-8">
                  <div className="flex gap-8 w-full">
                    {tvDetails.poster_path && (
                      <img
                        src={`${IMAGE_PATH}${tvDetails.poster_path}`}
                        alt={tvDetails.name}
                        className="w-32 md:w-48 h-48 md:h-72 object-cover rounded-lg shadow-lg"
                      />
                    )}
        
                    <div className="flex-1 flex flex-col justify-end mb-4">
                      <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{tvDetails.name}</h1>
                      <p className="text-gray-400 mb-4">
                        {tvDetails.genres.map((g) => g.name).join(', ')}
                      </p>
                      <div className="flex items-center gap-4 text-sm md:text-base">
                        <span className="text-yellow-500 font-semibold">★ {tvDetails.vote_average.toFixed(1)}</span>
                        <span className="text-gray-400">{firstAirYear}</span>
                        <span className="text-gray-400">{tvDetails.number_of_seasons} Season{tvDetails.number_of_seasons !== 1 ? 's' : ''}</span>
                        <span className="text-gray-400 bg-gray-800 px-3 py-1 rounded">{tvDetails.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        
    )
}