import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Toast from "../components/Toast";
import SimpleHeader from "../components/SimpleHeader";
import Footer from "../components/Footer";
import PasswordStrength from "../components/PasswordStrength";
import API_URL from "../config/apiConfig";
import { useToast } from "../hooks/useToast";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validation";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const navigate = useNavigate();
  const { toast, showSuccess, showError, hideToast } = useToast();

  return (
    <div className="bg-brand-bg min-h-screen flex flex-col">
      <SimpleHeader />
      <div className="flex-1 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="rounded-xl bg-white text-center p-6 sm:p-8 h-max shadow-brand-lg border border-primary-100">
            <Heading label={"Sign up"} />
            <SubHeading label={"Enter your information to create an account"} />
            <InputBox
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={"Enter your first name"}
              type={"text"}
              label={"First Name"}
              validation={validateName}
              required={true}
              autoFocus={true}
              error={errors.firstName}
            />
            <InputBox
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={"Enter your last name"}
              type={"text"}
              label={"Last Name"}
              validation={validateName}
              required={true}
              error={errors.lastName}
            />
            <InputBox
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"ayushkmr@gmail.com"}
              type={"email"}
              label={"Email"}
              validation={validateEmail}
              required={true}
              error={errors.email}
            />
            <div>
              <InputBox
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowPasswordStrength(e.target.value.length > 0);
                }}
                placeholder={"Create a strong password"}
                type={"password"}
                label={"Password"}
                validation={validatePassword}
                required={true}
                showPasswordToggle={true}
                error={errors.password}
              />
              {showPasswordStrength && <PasswordStrength password={password} />}
            </div>
            <div className="pt-4">
              <Button
                onClick={async () => {
                  if (isLoading) return;

                  // Basic validation
                  const newErrors = {};
                  if (!firstName.trim())
                    newErrors.firstName = "First name is required";
                  if (!lastName.trim())
                    newErrors.lastName = "Last name is required";
                  if (!email.trim()) newErrors.email = "Email is required";
                  if (!password.trim())
                    newErrors.password = "Password is required";
                  if (password.length < 6)
                    newErrors.password =
                      "Password must be at least 6 characters";

                  if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                    showError("Please fix the errors in the form");
                    return;
                  }

                  try {
                    setIsLoading(true);
                    setErrors({});

                    const response = await axios.post(
                      `${API_URL}/api/v1/user/signup`,
                      {
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        email: email.trim(),
                        password,
                      }
                    );

                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("Name", firstName.trim());
                    showSuccess(
                      `Welcome ${firstName}! Account created successfully!`
                    );

                    setTimeout(() => {
                      navigate("/dashboard");
                    }, 1500);
                  } catch (error) {
                    const errorMessage =
                      error.response?.data?.message ||
                      error.response?.data?.error ||
                      "Account creation failed. Please try again.";
                    showError(errorMessage);
                    console.error("Signup error:", error);
                  } finally {
                    setIsLoading(false);
                  }
                }}
                label="Sign up"
                isLoading={isLoading}
                loadingText="Creating Account..."
              />
            </div>
            <BottomWarning
              label={"Already have an account?"}
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
