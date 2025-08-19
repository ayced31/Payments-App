import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Toast from "../components/Toast";
import SimpleHeader from "../components/SimpleHeader";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/apiConfig";
import { useToast } from "../hooks/useToast";
import { validateEmail } from "../utils/validation";
import { useAuth } from "../contexts/AuthContext";
import { usePageTransition } from "../hooks/usePageTransition";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const { login } = useAuth();
  const { navigateWithTransition } = usePageTransition();

  return (
    <div className="bg-brand-bg min-h-screen flex flex-col">
      <SimpleHeader />
      <div className="flex-1 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="rounded-xl bg-white text-center p-6 sm:p-8 h-max shadow-brand-lg border border-primary-100">
            <Heading label={"Sign in"} />
            <SubHeading
              label={"Enter your credentials to access your account"}
            />
            <InputBox
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"ayushkmr@gmail.com"}
              type={"email"}
              label={"Email"}
              validation={validateEmail}
              required={true}
              autoFocus={true}
              error={errors.email}
            />
            <InputBox
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Enter your password"}
              type={"password"}
              label={"Password"}
              required={true}
              showPasswordToggle={true}
              error={errors.password}
            />
            <div className="pt-4">
              <Button
                onClick={async () => {
                  // Basic validation
                  const newErrors = {};
                  if (!email.trim()) newErrors.email = "Email is required";
                  if (!password.trim())
                    newErrors.password = "Password is required";

                  if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                    showError("Please fill in all required fields");
                    return;
                  }

                  try {
                    setIsLoading(true);
                    setErrors({});

                    const response = await axios.post(
                      `${API_URL}/api/v1/user/signin`,
                      { email: email.trim(), password }
                    );

                    login({
                      name: response.data.name,
                      token: response.data.token,
                    });
                    showSuccess("Welcome back! Redirecting to dashboard...");

                    navigateWithTransition(
                      navigate,
                      "/dashboard",
                      "Loading dashboard..."
                    );
                  } catch (error) {
                    const errorMessage =
                      error.response?.data?.message ||
                      error.response?.data?.error ||
                      "Sign in failed. Please check your credentials.";
                    showError(errorMessage);
                    console.error("Signin error:", error);
                  } finally {
                    setIsLoading(false);
                  }
                }}
                label="Sign in"
                isLoading={isLoading}
                loadingText="Signing in..."
              />
            </div>
            <BottomWarning
              label={"Forgot password?"}
              buttonText={"Reset"}
              to={"/reset"}
            />
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
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
