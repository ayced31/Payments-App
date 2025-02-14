import { useCallback, useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";
import axios from "axios";
import API_URL from "../config/apiConfig";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users onTransferComplete={fetchBalance} />
      </div>
    </div>
  );
};
