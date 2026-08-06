const Skeleton = ({ className = '' }) => {
  return <div className={`skeleton ${className}`} />;
};

export const TaskCardSkeleton = () => (
  <div className="card p-5 space-y-3">
    <div className="flex items-start justify-between">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-4/5" />
    <div className="flex items-center gap-3 pt-2">
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);

export const StatCardSkeleton = () => (
  <div className="card p-5 flex items-center gap-4">
    <Skeleton className="w-12 h-12 rounded-xl" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-6 w-14" />
      <Skeleton className="h-3 w-20" />
    </div>
  </div>
);

export const ActivitySkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center gap-3">
        <Skeleton className="w-2.5 h-2.5 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
    ))}
  </div>
);

export default Skeleton;