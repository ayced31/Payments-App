import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import LazyLoadFallback from "./components/LazyLoadFallback";
import ErrorBoundary from "./components/ErrorBoundary";
import { usePageTransition } from "./hooks/usePageTransition";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Signup = lazy(() =>
  import("./pages/Signup").then((module) => ({ default: module.Signup }))
);
const Signin = lazy(() =>
  import("./pages/Signin").then((module) => ({ default: module.Signin }))
);
const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((module) => ({ default: module.Dashboard }))
);
const SendMoney = lazy(() =>
  import("./pages/SendMoney").then((module) => ({ default: module.SendMoney }))
);
const Reset = lazy(() =>
  import("./pages/Reset").then((module) => ({ default: module.Reset }))
);

function AppRoutes() {
  const { pageTransition } = usePageTransition();

  return (
    <div
      className={`transition-opacity duration-300 ${
        pageTransition ? "opacity-0" : "opacity-100"
      }`}
    >
      <Suspense fallback={<LazyLoadFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
          />
          <Route
            path="/reset"
            element={
              <PublicRoute>
                <Reset />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/send"
            element={
              <ProtectedRoute>
                <SendMoney />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
