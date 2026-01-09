import { IMAGE_PATH } from "../services/api"
import { type TVDetails } from "../hooks/useTV"

interface tvHeroProps {
    tvDetails: TVDetails;
    backdropImage: string;
    firstAirYear: string;
    isInFavourites?: boolean;
    onToggleFavourites?: () => void;
    onPlayClick?: () => void;
}

export default function TvHero({tvDetails, backdropImage, firstAirYear, isInFavourites = false, onToggleFavourites, onPlayClick}: tvHeroProps) {
    return (
        <div className="relative h-96 md:h-125 w-full overflow-hidden">
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
                      <div className="flex items-center gap-4 text-sm md:text-base mb-6">
                        <span className="text-yellow-500 font-semibold">★ {tvDetails.vote_average.toFixed(1)}</span>
                        <span className="text-gray-400">{firstAirYear}</span>
                        <span className="text-gray-400">{tvDetails.number_of_seasons} Season{tvDetails.number_of_seasons !== 1 ? 's' : ''}</span>
                        <span className="text-gray-400 bg-gray-800 px-3 py-1 rounded">{tvDetails.status}</span>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={onPlayClick}
                          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 cursor-pointer rounded-lg font-semibold transition-colors flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Play Now
                        </button>
                        <button
                          onClick={onToggleFavourites}
                          className={`${
                            isInFavourites
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-gray-700 hover:bg-gray-600"
                          } text-white px-6 py-2 rounded-lg font-semibold cursor-pointer transition-colors flex items-center gap-2`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {isInFavourites ? "Remove from Favourites" : "Add to Favourites"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        
    )
}