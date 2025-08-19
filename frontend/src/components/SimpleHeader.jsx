import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCallback, useState } from "react";

const SimpleHeader = ({ showBackButton = false, backTo = "/" }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleBack = () => {
    navigate(backTo);
  };

  const handleLogoClick = () => {
    // Navigate to appropriate home based on auth status
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  return (
    <div className="w-full bg-white border-b border-primary-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Brand/Logo + Back button */}
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex items-center text-brand-muted hover:text-primary-600 transition-colors duration-150 mr-4"
                aria-label="Go back"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="hidden sm:inline text-sm font-medium">
                  Back
                </span>
              </button>
            )}

            {/* Brand/Logo - Left aligned like dashboard */}
            <div
              className="flex flex-col justify-center cursor-pointer text-xl sm:text-2xl font-bold text-primary-800 font-brand"
              onClick={handleLogoClick}
            >
              <span className="hidden sm:inline">Payments App</span>
              <span className="sm:hidden">PayTM</span>
            </div>
          </div>

          {/* Right side - Auth buttons or User Profile */}
          <div className="flex items-center relative">
            {!isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/signin")}
                  className="text-sm font-medium text-brand-muted hover:text-primary-600 transition-colors duration-150"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-150 shadow-sm"
                >
                  Sign up
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="hidden sm:flex flex-col justify-center mr-4 text-brand-text font-medium">
                  Hello, <span className="text-primary-700">{user?.name}</span>
                </div>
                <div
                  className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-primary-500 to-accent-500 flex justify-center mr-3 sm:mr-4 cursor-pointer hover:from-primary-600 hover:to-accent-600 transition-all duration-200 shadow-md"
                  onClick={toggleDropdown}
                >
                  <div className="flex flex-col justify-center h-full text-lg sm:text-xl text-white font-semibold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 top-16 bg-white shadow-brand rounded-lg w-32 sm:w-36 border border-primary-100 z-50">
                    <div className="sm:hidden px-4 py-2 border-b border-gray-100">
                      <p className="text-sm text-brand-text">
                        Hello,{" "}
                        <span className="text-primary-700 font-medium">
                          {user?.name}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors duration-150"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
