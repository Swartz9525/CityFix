import React, { useState, useRef } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Spinner,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

const TrackStatus = () => {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const reportRef = useRef();

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus(null);

    try {
      const response = await fetch(
        `https://city-fix-backend.vercel.app/api/service/status/${referenceNumber}`
      );
      const data = await response.json();

      if (response.ok) {
        setStatus(data);
      } else {
        setError(data.message || "No record found for this reference number.");
      }
    } catch (err) {
      setError("Unable to fetch data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "800px" }}>
      <Card className="p-4 shadow-sm" style={{ backgroundColor: "#ffffff" }}>
        <h3 className="text-center fw-bold" style={{ color: "#28a745" }}>
          📍 Track Your Complaint
        </h3>
        <p className="text-center text-muted mb-4">
          Enter your reference number to view current complaint status.
        </p>

        <Form onSubmit={handleTrack}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Reference Number</Form.Label>
            <Form.Control
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="e.g. 12345ABC"
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button
              type="submit"
              variant="success"
              disabled={loading}
              className="px-4"
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Check Status"
              )}
            </Button>
          </div>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-4 text-center">
            {error}
          </Alert>
        )}

        {status && (
          <>
            <Card
              ref={reportRef}
              className="mt-4 p-4 bg-light border-0 shadow-sm"
            >
              <h5 className="fw-bold mb-3" style={{ color: "#007bff" }}>
                📝 Complaint Details
              </h5>
              <Row>
                <Col sm={6}>
                  <p>
                    <strong>Reference No:</strong> {status.referenceNumber}
                  </p>
                  <p>
                    <strong>Category:</strong> {status.title}
                  </p>
                  <p>
                    <strong>Location:</strong> {status.address}
                  </p>
                </Col>
                <Col sm={6}>
                  <p>
                    <strong>Description:</strong> {status.description}
                  </p>
                  <p>
                    <strong>Submitted On:</strong> {status.dateTime}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`fw-bold ${
                        status.status === "Resolved"
                          ? "text-success"
                          : "text-warning"
                      }`}
                    >
                      {status.status}
                    </span>
                  </p>
                </Col>
              </Row>
            </Card>
          </>
        )}
      </Card>
    </Container>
  );
};

export default TrackStatus;
