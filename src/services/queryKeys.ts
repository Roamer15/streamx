export const tmdbKeys = {
  all: ["tmdb"] as const,
  list: (url: string) => ["tmdb", "list", url] as const,
  infinite: (url: string) => ["tmdb", "infinite", url] as const,
  search: (query: string) => ["tmdb", "search", query] as const,
  movie: (id: string) => ["tmdb", "movie", id] as const,
  tv: (id: string) => ["tmdb", "tv", id] as const,
  season: (id: string, season: number) => ["tmdb", "tv", id, "season", season] as const,
  credits: (type: "movie" | "tv", id: string) => ["tmdb", type, id, "credits"] as const,
  genres: () => ["tmdb", "genres", "movie"] as const,
};
