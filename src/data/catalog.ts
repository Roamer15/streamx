import { API_KEY, BASE_URL } from "../services/api";

export type MediaType = "movie" | "tv";

export interface Category {
  slug: string; // url segment, e.g. "horror"
  title: string; // carousel + page heading, e.g. "Horror"
  mediaType: MediaType; // decides /details/movie/:id vs /details/tv/:id
  path: string; // TMDB path after BASE_URL, e.g. "/discover/movie"
  params?: Record<string, string>; // extra TMDB query params
  accentLastWord?: boolean; // matches current Carousel prop
}

export const CATEGORIES: Category[] = [
  {
    slug: "trending",
    title: "Trending Now",
    mediaType: "movie",
    path: "/trending/movie/day",
    params: {},
    accentLastWord: true,
  },
  {
    slug: "latest-movies",
    title: "Latest Movies",
    mediaType: "movie",
    path: "/movie/now_playing",
    params: {},
    accentLastWord: true,
  },
  {
    slug: "latest-series",
    title: "Latest Series",
    mediaType: "tv",
    path: "/tv/on_the_air",
    params: {},
    accentLastWord: true,
  },
  {
    slug: "top-rated-movies",
    title: "Top Rated Movies",
    mediaType: "movie",
    path: "/movie/top_rated",
    params: {},
    accentLastWord: true,
  },
  {
    slug: "top-rated-series",
    title: "Top Rated Series",
    mediaType: "tv",
    path: "/tv/top_rated",
    params: {},
    accentLastWord: true,
  },
  {
    slug: "anime",
    title: "Anime",
    mediaType: "tv",
    path: "/discover/tv",
    params: { with_genres: "16", with_original_language: "ja" },
    accentLastWord: false,
  },
  {
    slug: "k-drama",
    title: "K Drama",
    mediaType: "tv",
    path: "/discover/tv",
    params: { with_original_language: "ko", with_genres: "18" },
    accentLastWord: true,
  },
  {
    slug: "bollywood",
    title: "Bollywood",
    mediaType: "movie",
    path: "/discover/movie",
    params: { with_original_language: "hi", region: "IN" },
    accentLastWord: false,
  },
  {
    slug: "animation",
    title: "Animation",
    mediaType: "tv",
    path: "/discover/tv",
    params: { with_genres: "16" },
    accentLastWord: false,
  },
  {
    slug: "martial-arts",
    title: "Martial Arts",
    mediaType: "movie",
    path: "/discover/movie",
    params: { with_genres: "28", region: "CN", with_original_language: "cn" },
    accentLastWord: true,
  },
  {
    slug: "horror",
    title: "Horror",
    mediaType: "movie",
    path: "/discover/movie",
    params: { with_genres: "27" },
    accentLastWord: true,
  },
  {
    slug: "comedy",
    title: "Comedy",
    mediaType: "movie",
    path: "/discover/movie",
    params: { with_genres: "35" },
    accentLastWord: true,
  },
  {
    slug: "sci-fi",
    title: "Sci-Fi",
    mediaType: "movie",
    path: "/discover/movie",
    params: { with_genres: "878" },
    accentLastWord: true,
  },
  {
    slug: "thriller",
    title: "Thriller",
    mediaType: "movie",
    path: "/discover/movie",
    params: { with_genres: "53" },
    accentLastWord: true,
  },
  {
    slug: "romance",
    title: "Romance",
    mediaType: "movie",
    path: "/discover/movie",
    params: { with_genres: "10749" },
    accentLastWord: true,
  },
  {
    slug: "documentaries",
    title: "Documentaries",
    mediaType: "movie",
    path: "/discover/movie",
    params: { with_genres: "99" },
    accentLastWord: true,
  },
  {
    slug: "nollywood",
    title: "Nollywood",
    mediaType: "movie",
    path: "/discover/movie",
    params: { with_origin_country: "NG" },
    accentLastWord: true,
  },
];

export function buildCategoryUrl(category: Category): string {
  let url = `${BASE_URL}${category.path}?api_key=${API_KEY}`;
  const params = category.params;
  if (params) {
    for (const key of Object.keys(params)) {
      url += `&${key}=${params[key]}`;
    }
  }
  return url;
}

export function getCategory(slug: string | undefined): Category | undefined {
  if (!slug) return undefined;
  return CATEGORIES.find((category) => category.slug === slug);
}
