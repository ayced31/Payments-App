import { useCallback, useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import axios from "axios";
import API_URL from "../config/apiConfig";
import { useToast } from "../hooks/useToast";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const { toast, showError, hideToast } = useToast();

  const fetchBalance = useCallback(async () => {
    try {
      setIsLoadingBalance(true);
      const response = await axios.get(`${API_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      showError("Failed to fetch balance. Please refresh the page.");
    } finally {
      setIsLoadingBalance(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Appbar />
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <Balance value={balance} isLoading={isLoadingBalance} />
          </div>
          <div className="bg-white rounded-xl shadow-brand p-4 sm:p-6">
            <Users onTransferComplete={fetchBalance} />
          </div>
        </div>
      </div>
      <Footer />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};
