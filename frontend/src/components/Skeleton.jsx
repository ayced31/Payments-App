// Reusable skeleton loading components

export const SkeletonBox = ({
  width = "w-full",
  height = "h-4",
  className = "",
}) => (
  <div
    className={`bg-gray-200 rounded animate-pulse ${width} ${height} ${className}`}
  />
);

export const SkeletonCircle = ({ size = "w-12 h-12" }) => (
  <div className={`bg-gray-200 rounded-full animate-pulse ${size}`} />
);

export const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonBox
        key={index}
        width={index === lines - 1 ? "w-3/4" : "w-full"}
        height="h-4"
      />
    ))}
  </div>
);

// User card skeleton
export const UserCardSkeleton = () => (
  <div className="flex justify-between items-center p-4 bg-primary-50 rounded-lg border border-primary-100 animate-pulse">
    <div className="flex items-center">
      <SkeletonCircle size="w-12 h-12" />
      <div className="ml-4 space-y-2">
        <SkeletonBox width="w-32" height="h-5" />
        <SkeletonBox width="w-24" height="h-3" />
      </div>
    </div>
    <SkeletonBox width="w-24" height="h-10" className="rounded-lg" />
  </div>
);

// Balance card skeleton
export const BalanceCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-brand p-6 border border-primary-100 animate-pulse">
    <div className="flex items-center justify-between">
      <SkeletonBox width="w-32" height="h-4" />
      <SkeletonBox width="w-40" height="h-8" />
    </div>
  </div>
);

// Users list skeleton
export const UsersListSkeleton = () => (
  <div className="space-y-3">
    <div className="space-y-4">
      <SkeletonBox width="w-48" height="h-6" />
      <SkeletonBox width="w-full" height="h-12" className="rounded-lg" />
    </div>
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <UserCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

// Loading spinner component
export const Spinner = ({ size = "w-5 h-5", color = "border-white" }) => (
  <div
    className={`${size} border-2 ${color} border-t-transparent rounded-full animate-spin`}
  />
);

// Page loading overlay
export const PageLoader = ({ message = "Loading..." }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-brand-lg">
      <Spinner size="w-8 h-8" color="border-primary-600" />
      <p className="mt-4 text-brand-text font-medium">{message}</p>
    </div>
  </div>
);

// Button loading state
export const ButtonLoader = ({ size = "w-4 h-4" }) => (
  <div className="flex items-center justify-center">
    <Spinner size={size} color="border-current" />
  </div>
);
