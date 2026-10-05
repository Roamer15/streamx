// Flat file, no bracket/dynamic filename: Vercel's Function router fails to resolve
// a dynamic catch-all filename nested in a subdirectory outside Next.js (confirmed via api/tmdb.ts).
import { CATEGORIES } from '../src/data/catalog';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const SITE_URL = 'https://chwiix.vercel.app';
const PAGES_PER_CATEGORY = 10;

async function fetchPage(path: string, apiKey: string, page: number): Promise<number[]> {
  try {
    const res = await fetch(`${TMDB_BASE}${path}?api_key=${apiKey}&page=${page}`);
    if (!res.ok) return [];
    const data = await res.json();
    const results = data.results ?? [];
    return results.map((item: { id: number }) => item.id);
  } catch {
    return [];
  }
}

async function fetchIds(path: string, apiKey: string): Promise<number[]> {
  const pages = await Promise.all(
    Array.from({ length: PAGES_PER_CATEGORY }, (_, i) => fetchPage(path, apiKey, i + 1))
  );
  const ids = pages.flat();
  return Array.from(new Set(ids));
}

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;
  const staticUrls = [
    '',
    '/movies',
    '/series',
    '/search',
    ...CATEGORIES.map((category) => `/browse/${category.slug}`),
  ];

  let movieIds: number[] = [];
  let tvIds: number[] = [];

  if (apiKey) {
    [movieIds, tvIds] = await Promise.all([
      fetchIds('/movie/popular', apiKey),
      fetchIds('/tv/popular', apiKey),
    ]);
  }

  const urls = [
    ...staticUrls.map((path) => `${SITE_URL}${path}`),
    ...movieIds.map((id) => `${SITE_URL}/details/movie/${id}`),
    ...tvIds.map((id) => `${SITE_URL}/details/tv/${id}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
