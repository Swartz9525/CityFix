import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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
  { name: "TrackStatus", path: "/trackstatus" },
];

const MyNavbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);

    // Fetch user details from localStorage (assuming login stores 'user')
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    localStorage.removeItem("token"); // Remove token (if stored)
    setUser(null);
    navigate("/"); // Redirect to home
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={`px-3 animate__animated ${
        animate ? "animate__fadeInDown" : ""
      }`}
      style={{ position: "relative", zIndex: 1050 }}
    >
      <Container>
        <Navbar.Brand className="text-success fw-bold">CityFix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page) => (
              <Nav.Link
                as={Link}
                to={page.path}
                key={page.name}
                className="text-light nav-item-hover"
              >
                {page.name}
              </Nav.Link>
            ))}
          </Nav>

          <Form className="d-flex me-3">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          {user ? (
            <NavDropdown
              title={<span className="text-light">{user.name}</span>}
              id="basic-nav-dropdown"
              show={showDropdown}
              onToggle={(isOpen) => setShowDropdown(isOpen)}
              className="dropdown-animate"
              menuVariant="dark"
            >
              {settings.map((setting) => (
                <NavDropdown.Item
                  key={setting.name}
                  onClick={() => navigate(setting.path)}
                >
                  {setting.name}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Button variant="outline-light" onClick={() => navigate("/")}>
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>

      <style>{`
        .nav-item-hover:hover {
          color: #80ed99 !important;
          transition: color 0.3s ease-in-out;
        }
        .dropdown-menu {
          z-index: 1051 !important;
          position: absolute !important;
        }
      `}</style>
    </Navbar>
  );
};

export default MyNavbar;
