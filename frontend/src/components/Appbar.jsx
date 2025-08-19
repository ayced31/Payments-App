import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Appbar = memo(() => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  return (
    <div className="shadow-brand h-16 bg-white border-b border-primary-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
        <div className="flex flex-col justify-center text-2xl sm:text-3xl font-bold text-primary-800 font-brand">
          <span className="hidden sm:inline">Payments App</span>
          <span className="sm:hidden">PayTM</span>
        </div>

        <div className="flex items-center relative">
          <div className="hidden sm:flex flex-col justify-center mr-4 text-brand-text font-medium text-lg">
            Hello, <span className="text-primary-700">{user?.name}</span>
          </div>
          <div
            className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-primary-500 to-accent-500 flex justify-center cursor-pointer hover:from-primary-600 hover:to-accent-600 transition-all duration-200 shadow-md relative"
            onClick={toggleDropdown}
          >
            <div className="flex flex-col justify-center h-full text-lg sm:text-xl text-white font-semibold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white shadow-brand rounded-lg w-32 sm:w-36 border border-primary-100 z-50">
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
      </div>
    </div>
  );
});

Appbar.displayName = "Appbar";
