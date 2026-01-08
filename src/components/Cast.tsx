import type { Cast } from "../pages/DetailsPage"
import { IMAGE_PATH } from "../services/api"

interface CastProp {
    actor: Cast;
}

export default function Cast({actor}: CastProp) {
    return (
        <div
                        key={actor.id}
                        className="group cursor-pointer transition-transform duration-300 hover:scale-105"
                      >
                        <div className="relative h-64 md:h-72 bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-3">
                          {actor.profile_path ? (
                            <img
                              src={`${IMAGE_PATH}${actor.profile_path}`}
                              alt={actor.name}
                              className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                              <span className="text-gray-500 text-sm text-center px-4">
                                No Image
                              </span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-white font-semibold text-sm truncate">
                          {actor.name}
                        </h3>
                        <p className="text-gray-400 text-xs truncate">
                          {actor.character}
                        </p>
                      </div>
    )
}
