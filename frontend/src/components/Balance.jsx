import { BalanceCardSkeleton } from "./Skeleton";

export const Balance = ({ value, isLoading = false }) => {
  if (isLoading) {
    return <BalanceCardSkeleton />;
  }

  return (
    <div className="bg-white rounded-xl shadow-brand p-6 border border-primary-100">
      <div className="flex items-center justify-between">
        <div className="text-brand-muted text-sm font-medium uppercase tracking-wide">
          Current Balance
        </div>
        <div className="text-3xl font-bold text-primary-800 flex items-center">
          <span className="text-accent-500 mr-2">₹</span>
          {value?.toLocaleString("en-IN") || "0"}
        </div>
      </div>
      <div className="mt-2 text-xs text-brand-muted">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};
