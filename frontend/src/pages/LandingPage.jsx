import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="max-w-3xl text-center -mt-10 px-4">
          <h1 className="text-6xl font-bold mb-6 text-primary-800 font-brand">
            Payments App
          </h1>
          <p className="text-xl text-brand-text mb-8 leading-relaxed">
            Simple & Secure Money Transfers. Send money instantly to anyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="w-full sm:w-52">
              <Button
                onClick={() => navigate("/signup")}
                label="Get Started"
                variant="primary"
              />
            </div>
            <div className="w-full sm:w-52">
              <Button
                onClick={() => navigate("/signin")}
                label="Sign In"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

LandingPage.displayName = "LandingPage";
export default LandingPage;
