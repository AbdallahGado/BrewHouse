// Skeleton Components for Loading States

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

export function MenuItemSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10">
      <div className="flex justify-between items-start mb-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

export function OrderSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="border-t pt-4">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
