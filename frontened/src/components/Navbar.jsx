import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

const pages = [
  { name: "Home", path: "/dashboard" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
  { name: "About Us", path: "/about" },
];

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Track Status", path: "/trackstatus" },
];

const MyNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [animate, setAnimate] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const isAdmin =
    user?.name?.toLowerCase() === "admin" || user?.role === "admin";

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={`px-3 animate__animated ${
        animate ? "animate__fadeInDown" : ""
      } shadow`}
      style={{ zIndex: 1050, position: "sticky", top: 0 }}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to={isAdmin ? "/admin" : "/dashboard"}
          className="text-success fw-bold fs-4"
        >
          {isAdmin ? "🛠️ Admin Panel" : "CityFix"}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAdmin ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/admin"
                  className={
                    location.pathname === "/admin"
                      ? "nav-link-active"
                      : "nav-link-custom"
                  }
                >
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/admin/users"
                  className={
                    location.pathname === "/admin/users"
                      ? "nav-link-active"
                      : "nav-link-custom"
                  }
                >
                  Users
                </Nav.Link>
              </>
            ) : (
              pages.map(({ name, path }) => (
                <Nav.Link
                  as={Link}
                  to={path}
                  key={name}
                  className={
                    location.pathname === path
                      ? "nav-link-active"
                      : "nav-link-custom"
                  }
                >
                  {name}
                </Nav.Link>
              ))
            )}
          </Nav>

          {!isAdmin && (
            <Form className="d-flex me-3">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          )}

          <div className="d-flex align-items-center gap-3">
            {isAdmin ? (
              <>
                <span className="text-light">Welcome Admin</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <NavDropdown
                title={<span className="text-light">{user.name}</span>}
                id="basic-nav-dropdown"
                show={showDropdown}
                onToggle={(isOpen) => setShowDropdown(isOpen)}
                className="dropdown-animate"
                menuVariant="dark"
              >
                {settings.map(({ name, path }) => (
                  <NavDropdown.Item key={name} onClick={() => navigate(path)}>
                    {name}
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>

      <style>{`
        .nav-link-custom {
          color: white !important;
          transition: color 0.3s ease-in-out;
        }

        .nav-link-custom:hover {
          color: #80ed99 !important;
        }

        .nav-link-active {
          color: #80ed99 !important;
          font-weight: bold;
        }

        .dropdown-menu {
          z-index: 1051 !important;
        }

        .dropdown-animate .dropdown-menu {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Navbar>
  );
};

export default MyNavbar;
