import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

const problemOptions = {
  Water: [
    "Leakage",
    "No Water Supply",
    "Dirty Water",
    "Low Pressure",
    "Pipeline Burst",
    "Contaminated Water",
    "Water Meter Issue",
  ],
  Electricity: [
    "Power Outage",
    "Voltage Fluctuation",
    "Faulty Meter",
    "Sparking Wires",
    "Frequent Tripping",
    "Transformer Failure",
    "High Electricity Bill",
  ],
  Road: [
    "Potholes",
    "Street Light Issue",
    "Road Blockage",
    "Open Manhole",
    "Broken Sidewalk",
    "Illegal Dumping",
    "Traffic Signal Malfunction",
  ],
};

const Services = () => {
  const [problem, setProblem] = useState("");
  const [subProblem, setSubProblem] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReferenceNumber = () => {
    return `REF-${Date.now().toString().slice(-6)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reportData = {
      referenceNumber: generateReferenceNumber(),
      title: problem,
      description: subProblem + " - " + description,
      address,
      contact,
      dateTime,
    };

    try {
      const response = await fetch(
        "https://city-fix-backend.vercel.app//api/service/report",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reportData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          `Report submitted successfully! Your reference number is: ${reportData.referenceNumber}`
        );
        setProblem("");
        setSubProblem("");
        setDescription("");
        setAddress("");
        setContact("");
        setDateTime("");
      } else {
        alert(data.message || "Failed to submit report. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 bg-dark text-white shadow-lg">
        <h3 className="text-success text-center fw-bold">Report a Problem</h3>
        <p className="text-center text-muted">
          Please fill in the details below to report an issue in your area.
        </p>

        <Form onSubmit={handleSubmit} className="mt-3">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Problem Category</Form.Label>
                <Form.Select
                  value={problem}
                  onChange={(e) => {
                    setProblem(e.target.value);
                    setSubProblem("");
                  }}
                  required
                >
                  <option value="">Choose...</option>
                  {Object.keys(problemOptions).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Specific Issue</Form.Label>
                <Form.Select
                  value={subProblem}
                  onChange={(e) => setSubProblem(e.target.value)}
                  disabled={!problem}
                  required
                >
                  <option value="">Choose...</option>
                  {problem &&
                    problemOptions[problem].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Additional Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..."
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Location / Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter the exact location"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Information</Form.Label>
                <Form.Control
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your phone or email"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Date & Time of Observation</Form.Label>
            <Form.Control
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Submit Report"
              )}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Services;
