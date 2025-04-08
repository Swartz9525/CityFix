import React, { useState } from "react";
import { Container, Form, Button, Card, Spinner, Alert } from "react-bootstrap";

const TrackStatus = () => {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus(null);

    try {
      const response = await fetch(
        `https://city-fix-backend.vercel.app//api/service/status/${referenceNumber}`
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
    <Container className="mt-5">
      <Card className="p-4 bg-dark text-white shadow-lg">
        <h3 className="text-success text-center fw-bold">
          Track Your Complaint
        </h3>
        <p className="text-center text-muted">
          Enter your reference number to check the status of your complaint.
        </p>

        <Form onSubmit={handleTrack} className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Reference Number</Form.Label>
            <Form.Control
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="Enter your reference number"
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Check Status"
              )}
            </Button>
          </div>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-3 text-center">
            {error}
          </Alert>
        )}

        {status && (
          <Card className="mt-4 p-3 bg-light text-dark">
            <h5 className="fw-bold text-primary">Complaint Details</h5>
            <p>
              <strong>Reference No:</strong> {status.referenceNumber}
            </p>
            <p>
              <strong>Category:</strong> {status.title}
            </p>
            <p>
              <strong>Description:</strong> {status.description}
            </p>
            <p>
              <strong>Location:</strong> {status.address}
            </p>
            <p>
              <strong>Submitted On:</strong> {status.dateTime}
            </p>
            <p>
              <strong>Current Status:</strong>{" "}
              <span
                className={`fw-bold ${
                  status.status === "Resolved" ? "text-success" : "text-warning"
                }`}
              >
                {status.status}
              </span>
            </p>
          </Card>
        )}
      </Card>
    </Container>
  );
};

export default TrackStatus;
