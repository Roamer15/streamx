import { MovieSkeleton } from "./MovieCardSkeleton";

export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
      {[...Array(8)].map((_, i) => (
        <MovieSkeleton key={i} />
      ))}
    </div>
  );
}
