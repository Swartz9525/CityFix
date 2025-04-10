import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Dashboard from "./components/Dashboard";
import Services from "./components/Services";
import ContactUs from "./components/Contact";
import TrackStatus from "./components/TrackStatus";
import AboutUs from "./components/AboutUs";
import ProfilePage from "./components/ProfilePage";
import AdminPanel from "./admin/Admin";
import User from "./admin/Users";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Account from "./components/Account";

import { AuthProvider, AuthContext } from "./context/AuthContext";

// 🔐 Reusable PrivateRoute wrapper
const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null; // Or a <Spinner />
  if (!user) return <Navigate to="/" />;
  return (
    <>
      <Navbar />
      {element}
      <Footer />
    </>
  );
};

// 🌐 Reusable PublicRoute wrapper
const PublicRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" />;
  return element;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoute element={<Login />} />} />
          <Route
            path="/signup"
            element={<PublicRoute element={<Signup />} />}
          />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/services"
            element={<PrivateRoute element={<Services />} />}
          />
          <Route
            path="/contact"
            element={<PrivateRoute element={<ContactUs />} />}
          />
          <Route
            path="/trackstatus"
            element={<PrivateRoute element={<TrackStatus />} />}
          />
          <Route
            path="/about"
            element={<PrivateRoute element={<AboutUs />} />}
          />
          <Route
            path="/account"
            element={<PrivateRoute element={<Account />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} />}
          />
          <Route
            path="/admin"
            element={<PrivateRoute element={<AdminPanel />} />}
          />
          <Route
            path="/admin/users"
            element={<PrivateRoute element={<User />} />}
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="text-center mt-5">
                <h2>404 - Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
