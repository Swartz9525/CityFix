import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Spinner,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ Import eye icons

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ State for password visibility
  const navigate = useNavigate();

  useEffect(() => {
    setApiError("");
  }, [formData.email, formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      const { data } = await axios.post(
        "https://cityfix-backend.vercel.app/api/auth/login",
        formData
      );

      if (data?.token && data?.user) {
        login(data.user, data.token);
        setFormData({ email: "", password: "" });

        // ✅ Admin Redirect Logic
        if (data.user.email === "admin@admin.com") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setApiError("Invalid response from server. Please try again.");
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-light"
    >
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="p-4 shadow-lg border-0 rounded-4">
            <Card.Body>
              <h3 className="text-center mb-4 fw-bold text-primary">Log In</h3>

              {apiError && <Alert variant="danger">{apiError}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Email Field */}
                <Form.Group controlId="email">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    required
                    className="rounded-3"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field with Show/Hide Feature */}
                <Form.Group controlId="password" className="mt-3">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"} // ✅ Toggle visibility
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      required
                      className="rounded-start-3"
                    />
                    <Button
                      variant="outline-secondary"
                      className="border border-start-0 rounded-end-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                      {/* ✅ Eye Icon */}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-4 w-100 py-2 rounded-3 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </Form>

              {/* Register Link */}
              <div className="text-center mt-3">
                <a
                  href="/signup"
                  className="text-decoration-none text-primary fw-semibold"
                >
                  Don't have an account? Register here
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
