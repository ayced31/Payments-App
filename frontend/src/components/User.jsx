import { memo, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { UsersListSkeleton, UserCardSkeleton } from "./Skeleton";
import API_URL from "../config/apiConfig";

export const Users = memo(({ onTransferComplete }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      if (filter) {
        setIsSearching(true);
      } else {
        setIsLoading(true);
      }

      const response = await axios.get(
        `${API_URL}/api/v1/user/search?filter=` + filter,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUsers(response.data.user);
    } catch (error) {
      console.error("Error fetching users: ", error);
      // Could add toast here if we pass showError as prop
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, [filter]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchUsers, filter]);

  // Show initial loading skeleton
  if (isLoading && !filter) {
    return <UsersListSkeleton />;
  }

  return (
    <>
      <div className="font-bold text-xl text-primary-800 mb-4 font-brand">
        Send Money
      </div>
      <div className="mb-6 relative">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200 transition-all duration-200 pr-10"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {isSearching ? (
          // Show skeleton while searching
          Array.from({ length: 3 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))
        ) : users.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">👥</div>
            <h3 className="text-lg font-medium text-brand-text mb-2">
              {filter ? "No users found" : "No users available"}
            </h3>
            <p className="text-brand-muted">
              {filter
                ? `No users match "${filter}"`
                : "Try refreshing the page"}
            </p>
          </div>
        ) : (
          // Show users
          users.map((user) => (
            <User
              key={user._id}
              user={user}
              onTransferComplete={onTransferComplete}
            />
          ))
        )}
      </div>
    </>
  );
});

Users.displayName = "Users";

const User = memo(({ user }) => {
  const navigate = useNavigate();

  const handleSendMoney = useCallback(() => {
    navigate(`/send?id=${user._id}&name=${user.firstName}`);
  }, [navigate, user._id, user.firstName]);

  const avatarColors = [
    "bg-gradient-to-r from-blue-500 to-purple-500",
    "bg-gradient-to-r from-green-500 to-teal-500",
    "bg-gradient-to-r from-pink-500 to-rose-500",
    "bg-gradient-to-r from-orange-500 to-red-500",
    "bg-gradient-to-r from-indigo-500 to-blue-500",
  ];

  const colorIndex = user.firstName.charCodeAt(0) % avatarColors.length;

  return (
    <div className="flex justify-between items-center p-4 bg-primary-50 rounded-lg border border-primary-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center">
        <div
          className={`rounded-full h-12 w-12 ${avatarColors[colorIndex]} flex justify-center mr-4 shadow-md`}
        >
          <div className="flex flex-col justify-center h-full text-xl text-white font-semibold">
            {user.firstName[0]?.toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-brand-text text-lg">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="w-32">
        <Button onClick={handleSendMoney} label="Send Money" variant="accent" />
      </div>
    </div>
  );
});

User.displayName = "User";
