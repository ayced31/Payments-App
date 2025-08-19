import { useEffect, useState } from "react";

const Toast = ({
  message,
  type = "info",
  isVisible,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (isVisible && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-orange-50 border-orange-200 text-orange-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconStyles = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div
        className={`flex items-center p-4 border rounded-lg shadow-brand max-w-sm ${typeStyles[type]}`}
      >
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mr-3 font-bold">
          {iconStyles[type]}
        </div>
        <div className="flex-1 text-sm font-medium">{message}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-3 text-lg leading-none hover:opacity-70"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
