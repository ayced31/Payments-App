import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("Name");

      if (token && name && isValidToken(token)) {
        setIsAuthenticated(true);
        setUser({ name, token });
      } else {
        // Clear invalid or expired tokens
        localStorage.removeItem("token");
        localStorage.removeItem("Name");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("Name");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidToken = (token) => {
    if (!token) return false;

    try {
      // Basic JWT validation - check if it has 3 parts
      const parts = token.split(".");
      if (parts.length !== 3) return false;

      // Decode payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const now = Date.now() / 1000;

      // Check if token is expired
      if (payload.exp && payload.exp < now) {
        console.log("Token expired");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  };

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("Name", userData.name);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Name");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
