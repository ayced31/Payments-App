// LandingPage.jsx
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-slate-300 flex flex-col justify-center items-center">
        <div className="max-w-3xl text-center -mt-10 px-4">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            Payments App
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Simple & Secure Money Transfers. Send money instantly to anyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="w-full sm:w-48">
              <Button onClick={() => navigate("/signup")} label="Get Started" />
            </div>
            <div className="w-full sm:w-48">
              <button
                onClick={() => navigate("/signin")}
                className="w-full text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border border-gray-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p>Project By Ayush Kumar.</p>
        </div>
      </div>
    </>
  );
};

LandingPage.displayName = "LandingPage";
export default LandingPage;
