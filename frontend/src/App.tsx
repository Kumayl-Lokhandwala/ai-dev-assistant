import React, { type JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import PricingPage from "./pages/PricingPage";
import FeaturesPage from "./pages/FeaturesPage";
import DocumentationPage from "./pages/DocumentationPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import { Toaster } from "react-hot-toast";
import ProjectsPage from "./pages/ProjectsPage";

// This wrapper component protects routes that require authentication
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// This component contains all the routing logic
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      {/* Root path logic: shows LandingPage if logged out, Dashboard if logged in */}
      <Route
        path="/"
        element={isAuthenticated ? <Dashboard /> : <LandingPage />}
      />
      {/* Protected Routes */}
      <Route
        path="/project/:id"
        element={
          <PrivateRoute>
            <ProjectDetailPage />
          </PrivateRoute>
        }
      />
      {/* Catch-all to redirect to the home page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// The main App component sets up the providers and router
function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="bottom-right" />
        <Layout />
      </Router>
    </AuthProvider>
  );
}

const Layout = () => {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith("/project/");

  return (
    <>
      {!isProjectPage && <Navbar />}
      <main>
        <AppRoutes />
      </main>
    </>
  );
};

export default App;
