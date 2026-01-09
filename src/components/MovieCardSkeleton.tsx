export const MovieSkeleton = () => (
  <div className="shrink-0 w-40 md:w-50 animate-pulse">
    {/* The Poster Area */}
    <div className="shimmer rounded-lg aspect-2/3 w-full mb-2"></div>
    {/* The Title Line */}
    <div className="h-4 bg-gray-800 rounded w-3/4 mb-1"></div>
    {/* The Subtitle Line */}
    <div className="h-3 bg-gray-900 rounded w-1/2"></div>
  </div>
);
