export default function TvDetailsSkeletonLoader() {
  return (
    <div style={{ background: "#0e0e0e" }}>
      {/* Hero Section */}
      <div className="relative h-96 md:h-125 w-full overflow-hidden px-4 md:px-8 lg:px-16 flex items-end py-8" style={{ background: "#0e0e0e" }}>
        {/* Background Shimmer */}
        <div className="absolute inset-0 shimmer animate-pulse" />

        <div className="relative z-10 flex gap-8 w-full">
          {/* Poster Skeleton */}
          <div className="shrink-0 w-27 md:w-48 h-45 md:h-72 rounded-lg animate-pulse" style={{ background: "#1a1a1a" }} />

          <div className="flex-1 flex flex-col justify-end mb-4 space-y-4">
            {/* Title Skeleton */}
            <div className="h-10 md:h-14 rounded w-2/3 animate-pulse" style={{ background: "#1a1a1a" }} />

            {/* Genres Skeleton */}
            <div className="h-4 rounded w-1/3 animate-pulse" style={{ background: "#1a1a1a" }} />

            {/* Meta Info Skeletons */}
            <div className="flex items-center gap-4">
              <div className="h-5 rounded w-12 animate-pulse" style={{ background: "#1a1a1a" }} />
              <div className="h-5 rounded w-16 animate-pulse" style={{ background: "#1a1a1a" }} />
              <div className="h-5 rounded w-20 animate-pulse" style={{ background: "#1a1a1a" }} />
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-4 pt-2">
              <div className="h-10 md:h-12 rounded-lg w-28 md:w-32 animate-pulse" style={{ background: "#1a1a1a" }} />
              <div className="h-10 md:h-12 rounded-lg w-28 md:w-48 animate-pulse" style={{ background: "#1a1a1a" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="px-4 md:px-8 lg:px-14 py-5 md:py-8">
        {/* Title Skeleton */}
        <div className="h-7 md:h-8 rounded w-32 mb-4 animate-pulse" style={{ background: "#1a1a1a" }} />

        {/* Overview Text Lines */}
        <div className="space-y-3 max-w-6xl">
          <div className="h-4 rounded w-full animate-pulse" style={{ background: "#1a1a1a" }} />
          <div className="h-4 rounded w-11/12 animate-pulse" style={{ background: "#1a1a1a" }} />
          <div className="h-4 rounded w-10/12 animate-pulse" style={{ background: "#1a1a1a" }} />
          <div className="h-4 rounded w-4/5 animate-pulse" style={{ background: "#1a1a1a" }} />
        </div>

        {/* Created By Skeleton */}
        <div className="mt-8">
          <div className="h-6 rounded w-28 mb-2 animate-pulse" style={{ background: "#1a1a1a" }} />
          <div className="h-4 rounded w-40 animate-pulse" style={{ background: "#1a1a1a" }} />
        </div>

        {/* Networks Skeleton */}
        <div className="mt-8">
          <div className="h-6 rounded w-24 mb-3 animate-pulse" style={{ background: "#1a1a1a" }} />
          <div className="flex gap-4">
            <div className="h-12 w-24 rounded animate-pulse" style={{ background: "#1a1a1a" }} />
            <div className="h-12 w-24 rounded animate-pulse" style={{ background: "#1a1a1a" }} />
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="px-6 md:px-14 py-10">
        {/* Title Skeleton */}
        <div className="h-7 md:h-8 rounded w-20 mb-7 animate-pulse" style={{ background: "#1a1a1a" }} />

        {/* Cast Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full aspect-square rounded-lg animate-pulse" style={{ background: "#1a1a1a" }} />
              <div className="h-4 rounded w-full animate-pulse" style={{ background: "#1a1a1a" }} />
              <div className="h-3 rounded w-3/4 animate-pulse" style={{ background: "#1a1a1a" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Similar Series Carousel */}
      <div className="px-6 md:px-14 py-10">
        {/* Title Skeleton */}
        <div className="h-7 md:h-8 rounded w-40 mb-7 animate-pulse" style={{ background: "#1a1a1a" }} />

        {/* Series Cards Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full aspect-video rounded-lg animate-pulse" style={{ background: "#1a1a1a" }} />
              <div className="h-4 rounded w-full animate-pulse" style={{ background: "#1a1a1a" }} />
              <div className="h-3 rounded w-2/3 animate-pulse" style={{ background: "#1a1a1a" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Carousel */}
      <div className="px-6 md:px-14 py-10">
        {/* Title Skeleton */}
        <div className="h-7 md:h-8 rounded w-48 mb-7 animate-pulse" style={{ background: "#1a1a1a" }} />

        {/* Series Cards Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full aspect-video rounded-lg animate-pulse" style={{ background: "#1a1a1a" }} />
              <div className="h-4 rounded w-full animate-pulse" style={{ background: "#1a1a1a" }} />
              <div className="h-3 rounded w-2/3 animate-pulse" style={{ background: "#1a1a1a" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
