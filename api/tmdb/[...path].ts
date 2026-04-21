const TMDB_BASE = 'https://api.themoviedb.org/3';

export default async function handler(req: any, res: any) {
  const { path, api_key: _ignored, ...rest } = req.query;
  const tmdbPath = Array.isArray(path) ? path.join('/') : path ?? '';

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(rest)) {
    if (typeof value === 'string') params.set(key, value);
    else if (Array.isArray(value)) (value as string[]).forEach(v => params.append(key, v));
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'TMDB_API_KEY is not configured' });
    return;
  }
  params.set('api_key', apiKey);

  try {
    const response = await fetch(`${TMDB_BASE}/${tmdbPath}?${params.toString()}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
}
