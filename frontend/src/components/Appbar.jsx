import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = memo(() => {
  const [name, setName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("Name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Name");
    navigate("/");
  };

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center text-2xl font-bold h-full ml-4">
        Payments App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello, {name}
        </div>
        <div
          className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer hover:bg-slate-300 transition duration-200"
          cursor="pointer"
          onClick={toggleDropdown}
        >
          <div className="flex flex-col justify-center h-full text-xl">
            {name[0]}
          </div>
        </div>

        {dropdownOpen && (
          <div className="absolute right-2 top-14 bg-white shadow-md rounded-lg w-32">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

Appbar.displayName = "Appbar";
