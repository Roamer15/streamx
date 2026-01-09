export default function TvDetailsSkeletonLoader() {
  return (
    <>
      <div className="relative h-96 md:h-125 w-full overflow-hidden bg-gray-950 px-4 md:px-8 lg:px-16 flex items-end py-8">
        {/* Background Shimmer */}
        <div className="absolute inset-0 shimmer animate-pulse" />

        <div className="relative z-10 flex gap-8 w-full">
          {/* Poster Skeleton */}
          <div className="shrink-0 w-27 md:w-48 h-45 md:h-72 bg-gray-800 rounded-lg animate-pulse" />

          <div className="flex-1 flex flex-col justify-end mb-4 space-y-4">
            {/* Title Skeleton */}
            <div className="h-10 md:h-14 bg-gray-800 rounded w-2/3 animate-pulse" />

            {/* Genres Skeleton */}
            <div className="h-4 bg-gray-800 rounded w-1/3 animate-pulse" />

            {/* Meta Info Skeletons */}
            <div className="flex items-center gap-4">
              <div className="h-5 bg-gray-800 rounded w-12 animate-pulse" />
              <div className="h-5 bg-gray-800 rounded w-16 animate-pulse" />
              <div className="h-5 bg-gray-800 rounded w-20 animate-pulse" />
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-4 pt-2">
              <div className="h-10 md:h-12 bg-gray-800 rounded-lg w-28 md:w-32 animate-pulse" />
              <div className="h-10 md:h-12 bg-gray-800 rounded-lg w-28 md:w-48 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 lg:px-14 py-5 md:py-8">
        {/* Title Skeleton */}
        <div className="h-7 md:h-8 bg-gray-800 rounded w-32 mb-4 animate-pulse" />

        {/* Overview Text Lines */}
        <div className="space-y-3 max-w-6xl">
          <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-11/12 animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-10/12 animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-4/5 animate-pulse" />
        </div>

        {/* Created By Skeleton */}
        <div className="mt-8">
          <div className="h-6 bg-gray-800 rounded w-28 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-40 animate-pulse" />
        </div>

        {/* Networks Skeleton */}
        <div className="mt-8">
          <div className="h-6 bg-gray-800 rounded w-24 mb-3 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-12 w-24 bg-gray-800 rounded animate-pulse" />
            <div className="h-12 w-24 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
}
