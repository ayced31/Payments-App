import { Spinner } from "./Skeleton";

const LazyLoadFallback = () => {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="text-center">
        <Spinner
          size="w-12 h-12"
          color="border-primary-600 border-t-transparent"
        />
        <p className="mt-4 text-brand-muted animate-pulse">Loading page...</p>
      </div>
    </div>
  );
};

export default LazyLoadFallback;
