import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Card, Row, Col, Badge, Spinner } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="text-muted mt-2">Loading profile...</p>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <p className="text-danger">No user data found. Please login.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5 animate__animated animate__fadeIn">
      <Card className="shadow-lg bg-dark text-light">
        <Card.Header className="text-center fs-4 fw-semibold text-success">
          <i className="bi bi-person-circle me-2"></i>User Profile
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">
              Name:
            </Col>
            <Col sm={8}>{user.name || "N/A"}</Col>
          </Row>
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">
              Email:
            </Col>
            <Col sm={8}>
              <Badge bg="info" text="dark">
                {user.email || "N/A"}
              </Badge>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">
              Joined:
            </Col>
            <Col sm={8}>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "Unknown"}
            </Col>
          </Row>
          {/* Add more custom fields here if your user object has them */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
