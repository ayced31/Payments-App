import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePageTransition = () => {
  const [pageTransition, setPageTransition] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPageTransition(true);
    const timer = setTimeout(() => setPageTransition(false), 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const startTransition = useCallback((message = "Loading...") => {
    setTransitionMessage(message);
    setIsTransitioning(true);
  }, []);

  const endTransition = useCallback(() => {
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionMessage("");
    }, 500);
  }, []);

  const navigateWithTransition = useCallback(
    (navigate, path, message) => {
      startTransition(message);
      setPageTransition(true);
      setTimeout(() => {
        navigate(path);
      }, 150);
      setTimeout(() => {
        endTransition();
      }, 800);
    },
    [startTransition, endTransition]
  );

  return {
    pageTransition,
    isTransitioning,
    transitionMessage,
    startTransition,
    endTransition,
    navigateWithTransition,
  };
};
