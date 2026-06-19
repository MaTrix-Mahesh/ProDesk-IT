export const SkeletonCard = () => (
  <div className="relative rounded-xl overflow-hidden bg-[#0e0e14]/60 border border-white/5 p-2 flex flex-col gap-3 shadow-2xl">
    {/* Poster Skeleton */}
    <div className="aspect-[2/3] w-full rounded-lg shimmer-pulse" />
    
    {/* Info Skeletons */}
    <div className="flex flex-col gap-2 px-1 pb-2">
      {/* Title skeleton */}
      <div className="h-4 w-5/6 rounded shimmer-pulse" />
      {/* Year/Info skeleton */}
      <div className="h-3 w-2/5 rounded shimmer-pulse" />
    </div>
  </div>
);

export const MovieGridSkeleton = ({ count = 10 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {[...Array(count)].map((_, i) => <SkeletonCard key={i} />)}
  </div>
);

export default MovieGridSkeleton;