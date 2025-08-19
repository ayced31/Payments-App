import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import BottomWarning from "../components/BottomWarning";
import Toast from "../components/Toast";
import SimpleHeader from "../components/SimpleHeader";
import Footer from "../components/Footer";
import PasswordStrength from "../components/PasswordStrength";
import axios from "axios";
import API_URL from "../config/apiConfig";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useToast } from "../hooks/useToast";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "../utils/validation";

export const Reset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const navigate = useNavigate();
  const { toast, showSuccess, showError, hideToast } = useToast();

  const handleReset = async () => {
    if (isLoading) return;

    // Basic validation
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your password";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showError("Please fix the errors in the form");
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      const response = await axios.put(
        `${API_URL}/api/v1/user/reset-password`,
        {
          email: email.trim(),
          password,
        }
      );

      if (response.data.success) {
        showSuccess("Password reset successfully! Redirecting to sign in...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        showError("Password reset failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Error resetting password. Please try again.";
      showError(errorMessage);
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen flex flex-col">
      <SimpleHeader />

      {/* Back button below navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <button
          onClick={() => navigate("/signin")}
          className="flex items-center text-brand-muted hover:text-primary-600 transition-colors duration-150"
          aria-label="Go back to signin"
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
          <span className="text-sm font-medium">Back to Sign in</span>
        </button>
      </div>

      <div className="flex-1 flex justify-center items-center px-4 pb-8">
        <div className="w-full max-w-md">
          <div className="rounded-xl bg-white text-center p-6 sm:p-8 h-max shadow-brand-lg border border-primary-100">
            <Heading label={"Reset Password"} />
            <SubHeading label={"Enter your email and new password"} />
            <InputBox
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Enter your email address"}
              type={"email"}
              label={"Email"}
              validation={validateEmail}
              required={true}
              autoFocus={true}
              error={errors.email}
            />
            <div>
              <InputBox
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowPasswordStrength(e.target.value.length > 0);
                }}
                placeholder={"Enter your new password"}
                type={"password"}
                label={"New Password"}
                validation={validatePassword}
                required={true}
                showPasswordToggle={true}
                error={errors.password}
              />
              {showPasswordStrength && <PasswordStrength password={password} />}
            </div>
            <InputBox
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={"Confirm your new password"}
              type={"password"}
              label={"Confirm Password"}
              validation={(value) => validatePasswordConfirm(password, value)}
              required={true}
              showPasswordToggle={true}
              error={errors.confirmPassword}
            />
            <div className="pt-6">
              <Button
                onClick={handleReset}
                label="Confirm Reset"
                isLoading={isLoading}
                loadingText="Resetting Password..."
              />
            </div>
            <BottomWarning
              label={"Remembered your password?"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
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
