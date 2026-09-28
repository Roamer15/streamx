export interface ContinueWatchingEntry {
  id: number;
  mediaType: "movie" | "tv";
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  season?: number;
  episode?: number;
  lastWatchedAt: number;
}

const STORAGE_KEY = "continueWatching";
const MAX_ENTRIES = 20;

export function getContinueWatching(): ContinueWatchingEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ContinueWatchingEntry[];
    return parsed.sort((a, b) => b.lastWatchedAt - a.lastWatchedAt);
  } catch {
    return [];
  }
}

export function upsertContinueWatching(entry: Omit<ContinueWatchingEntry, "lastWatchedAt">): void {
  const existing = getContinueWatching().filter(
    (e) => !(e.id === entry.id && e.mediaType === entry.mediaType)
  );
  const updated = [{ ...entry, lastWatchedAt: Date.now() }, ...existing].slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function removeContinueWatching(id: number, mediaType: "movie" | "tv"): void {
  const updated = getContinueWatching().filter((e) => !(e.id === id && e.mediaType === mediaType));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
