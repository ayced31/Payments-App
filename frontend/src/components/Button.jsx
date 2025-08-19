import { Spinner } from "./Skeleton";

export default function Button({
  label,
  onClick,
  variant = "primary",
  isLoading = false,
  disabled = false,
  loadingText = "Loading...",
  icon = null,
}) {
  const baseClasses =
    "w-full font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition-all duration-200 focus:outline-none focus:ring-4 relative overflow-hidden";

  const variants = {
    primary: `text-white bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-900 focus:ring-primary-300 shadow-md hover:shadow-lg border-2 border-transparent ${
      isLoading || disabled ? "opacity-75 cursor-not-allowed" : ""
    }`,
    secondary: `text-primary-800 bg-white border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300 focus:ring-primary-300 ${
      isLoading || disabled ? "opacity-75 cursor-not-allowed" : ""
    }`,
    accent: `text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-600 focus:ring-accent-300 shadow-md hover:shadow-lg ${
      isLoading || disabled ? "opacity-75 cursor-not-allowed" : ""
    }`,
  };

  const handleClick = (e) => {
    if (isLoading || disabled) return;
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variants[variant]}`}
    >
      <div className="flex items-center justify-center space-x-2">
        {isLoading ? (
          <>
            <Spinner
              size="w-4 h-4"
              color="border-current border-t-transparent"
            />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {icon && <span className="w-4 h-4">{icon}</span>}
            <span>{label}</span>
          </>
        )}
      </div>
    </button>
  );
}
