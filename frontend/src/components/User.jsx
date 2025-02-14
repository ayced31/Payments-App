import { memo, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import API_URL from "../config/apiConfig";

export const Users = memo(({ onTransferComplete }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/user/bulk?filter=` + filter,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUsers(response.data.user);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }, [filter]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchUsers, filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users.."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User
            key={user._id}
            user={user}
            onTransferComplete={onTransferComplete}
          />
        ))}
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

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button onClick={handleSendMoney} label={"Send Money"} />
      </div>
    </div>
  );
});

User.displayName = "User";
