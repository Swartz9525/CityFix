import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Services from "./components/Services";
import ContactUs from "./components/Contact";
import TrackStatus from "./components/TrackStatus";
import AboutUs from "./components/AboutUs";
import ProfilePage from "./components/ProfilePage";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// Layout wrapper to show Navbar/Footer only when logged in
const Layout = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user from context
  return (
    <>
      {user && <Navbar />} {/* Show Navbar if logged in */}
      {children}
      {user && <Footer />} {/* Show Footer if logged in */}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/trackstatus" element={<TrackStatus />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="*"
              element={
                <div className="text-center mt-4">
                  <h2>404 - Page Not Found</h2>
                </div>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
