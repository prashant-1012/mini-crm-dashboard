interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = '' }: SkeletonProps) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} />
);

export const KpiCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4">
    <Skeleton className="h-4 w-28" />
    <Skeleton className="h-9 w-36" />
    <Skeleton className="h-4 w-24" />
  </div>
);

export default Skeleton;