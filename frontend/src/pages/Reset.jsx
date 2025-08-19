import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import API_URL from "../config/apiConfig";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export const Reset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await axios.put(`${API_URL}/api/v1/user/reset-password`, {
      email,
      password,
    });
    if (response.data.success) {
      navigate("/signin");
    } else {
      alert("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Reset Password"} />
          <SubHeading label={"Enter your email and new password"} />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"ak31@gmail.com"}
            type={"email"}
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder={""}
            type={"password"}
            label={"Password"}
          />
          <InputBox
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={""}
            type={"text"}
            label={"Confirm Password"}
          />
          <div className="pt-6">
            <Button onClick={handleReset} label={"Confirm Reset"} />
          </div>
        </div>
      </div>
    </div>
  );
};
