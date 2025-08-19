import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import BottomWarning from "../components/BottomWarning";
import SimpleHeader from "../components/SimpleHeader";
import Footer from "../components/Footer";
import API_URL from "../config/apiConfig";
import { useToast } from "../hooks/useToast";
import { validateAmount } from "../utils/validation";
import { usePageTransition } from "../hooks/usePageTransition";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const { navigateWithTransition } = usePageTransition();

  const handleTransfer = useCallback(async () => {
    if (isLoading) return;

    // Validation
    const newErrors = {};
    const numAmount = parseFloat(amount);

    if (!amount.trim()) newErrors.amount = "Amount is required";
    else if (isNaN(numAmount)) newErrors.amount = "Please enter a valid amount";
    else if (numAmount <= 0) newErrors.amount = "Amount must be greater than 0";
    else if (numAmount > 1000000)
      newErrors.amount = "Amount cannot exceed ₹10,00,000";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showError("Please enter a valid amount");
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      await axios.post(
        `${API_URL}/api/v1/account/transfer`,
        {
          to: id,
          amount: numAmount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      showSuccess(
        `₹${numAmount.toLocaleString("en-IN")} sent successfully to ${name}!`
      );

      navigateWithTransition(
        navigate,
        "/dashboard",
        "Returning to dashboard..."
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Transfer failed. Please try again.";
      showError(errorMessage);
      console.error("Transfer failed: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, amount, navigate, isLoading, name, showSuccess, showError]);

  return (
    <div className="bg-brand-bg min-h-screen flex flex-col">
      <SimpleHeader />

      <div className="flex-1">
        {/* Back button below navbar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-brand-muted hover:text-primary-600 transition-colors duration-150"
            aria-label="Go back to dashboard"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
        </div>

        <div className="flex justify-center items-center min-h-[calc(100vh-12rem)] px-4 pb-8">
          <div className="w-full max-w-md">
            <div className="rounded-xl bg-white text-center p-6 sm:p-8 h-max shadow-brand-lg border border-primary-100">
              <Heading label={"Send Money"} />
              <SubHeading label={`Transfer money to ${name} securely`} />

              {/* Recipient Info */}
              <div className="flex items-center justify-center space-x-4 mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
                  <span className="text-xl text-white font-semibold">
                    {name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-primary-800">
                    {name}
                  </h3>
                  <p className="text-sm text-brand-muted">Recipient</p>
                </div>
              </div>

              <InputBox
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                label="Amount (₹)"
                placeholder="Enter amount to send"
                validation={validateAmount}
                required={true}
                autoFocus={true}
                error={errors.amount}
              />

              <div className="pt-4">
                <Button
                  onClick={handleTransfer}
                  label="Send Money"
                  variant="accent"
                  isLoading={isLoading}
                  loadingText="Processing Transfer..."
                />
              </div>

              <BottomWarning
                label={"Want to go back?"}
                buttonText={"Dashboard"}
                to={"/dashboard"}
              />
            </div>
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
