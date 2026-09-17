const TMDB_BASE = 'https://api.themoviedb.org/3';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tmdbPath = url.pathname.replace(/^\/api\/tmdb\//, '');

  const params = url.searchParams;
  params.delete('api_key');

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'TMDB_API_KEY is not configured' }, { status: 500 });
  }
  params.set('api_key', apiKey);

  try {
    const response = await fetch(`${TMDB_BASE}/${tmdbPath}?${params.toString()}`);
    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json({ error: 'Failed to fetch from TMDB' }, { status: 500 });
  }
}
