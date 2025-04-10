import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Account = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const { token, user } = useContext(AuthContext);

  const userEmail = user?.email || "";

  // Fetch issues
  useEffect(() => {
    const fetchIssues = async () => {
      if (!userEmail) return;

      try {
        const { data } = await axios.get(
          `https://city-fix-backend.vercel.app/api/issues/my-issues?email=${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIssues(data);
        setFilteredIssues(data);
      } catch (err) {
        console.error("Error fetching issues:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && userEmail) fetchIssues();
  }, [token, userEmail]);

  // Status change handler
  const handleStatusFilter = (e) => {
    const selected = e.target.value;
    setStatusFilter(selected);
    setFilteredIssues(
      selected === "All"
        ? issues
        : issues.filter((issue) => issue.status === selected)
    );
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvData = [
      [
        "Title",
        "Status",
        "Reference",
        "Description",
        "Address",
        "Contact",
        "Email",
        "Date Reported",
      ],
      ...filteredIssues.map((i) => [
        i.title,
        i.status,
        i.referenceNumber,
        i.description,
        i.address,
        i.contact,
        i.email,
        new Date(i.dateTime).toLocaleString(),
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "my_issues.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF
  const exportToPDF = () => {
    if (!filteredIssues.length) {
      alert("No issues available to export.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("My Reported Issues", 14, 16);

    const tableColumn = [
      "Title",
      "Status",
      "Ref#",
      "Address",
      "Email",
      "Reported",
    ];
    const tableRows = filteredIssues.map((i) => [
      i.title,
      i.status,
      i.referenceNumber,
      i.address,
      i.email,
      new Date(i.dateTime).toLocaleString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [80, 237, 153] },
    });

    doc.save("my_issues.pdf");
  };

  const issueCount = {
    total: issues.length,
    pending: issues.filter((i) => i.status === "Pending").length,
    completed: issues.filter((i) => i.status === "Completed").length,
  };

  const getBadge = (status) => {
    const badgeMap = {
      Completed: { variant: "success", text: "light" },
      Pending: { variant: "warning", text: "dark" },
      Default: { variant: "secondary", text: "light" },
    };
    return badgeMap[status] || badgeMap.Default;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center fw-bold mb-2">Your Issue Dashboard</h3>
      <p className="text-center text-muted mb-4">
        Welcome back, <strong>{user?.name || userEmail}</strong>. You can track,
        filter, and export all the issues you’ve reported here.
      </p>

      <Row className="mb-4 text-center">
        <Col md={4}>
          <Card bg="light" className="shadow-sm border-0">
            <Card.Body>
              <h6>Total Issues Reported</h6>
              <h4 className="fw-bold">{issueCount.total}</h4>
              <p className="small text-muted mb-0">Across all statuses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="warning" text="dark" className="shadow-sm border-0">
            <Card.Body>
              <h6>Pending</h6>
              <h4 className="fw-bold">{issueCount.pending}</h4>
              <p className="small text-muted mb-0">Awaiting resolution</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="success" text="white" className="shadow-sm border-0">
            <Card.Body>
              <h6>Completed</h6>
              <h4 className="fw-bold">{issueCount.completed}</h4>
              <p className="small text-light mb-0">Resolved and closed</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3 align-items-end">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">Filter by Status</Form.Label>
            <Form.Select value={statusFilter} onChange={handleStatusFilter}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Form.Select>
            <Form.Text className="text-muted">
              Narrow down your issue list based on status.
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={8} className="text-md-end mt-3 mt-md-0">
          <Form.Label className="fw-semibold me-3">
            Export Your Data:
          </Form.Label>
          <Button
            variant="outline-primary"
            className="me-2"
            onClick={exportToCSV}
          >
            Export CSV
          </Button>
          <Button variant="outline-secondary" onClick={exportToPDF}>
            Export PDF
          </Button>
        </Col>
      </Row>

      {filteredIssues.length === 0 ? (
        <Alert variant="info">
          No issues found for the selected filter. Try adjusting it or come back
          later.
        </Alert>
      ) : (
        <Row>
          {filteredIssues.map((issue) => {
            const badge = getBadge(issue.status);
            return (
              <Col key={issue._id} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <h5 className="mb-0">{issue.title}</h5>
                      <Badge bg={badge.variant} text={badge.text}>
                        {issue.status}
                      </Badge>
                    </div>
                    <div className="text-muted mb-2">
                      Reference No : {issue.referenceNumber}
                    </div>
                    <p className="small">
                      <strong>Description:</strong> {issue.description}
                      <br />
                      <strong>Address:</strong> {issue.address}
                      <br />
                      <strong>Contact:</strong> {issue.contact}
                      <br />
                      <strong>Email:</strong> {issue.email}
                      <br />
                      <strong>Date:</strong>{" "}
                      {new Date(issue.dateTime).toLocaleString()}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <footer className="text-center text-muted mt-5 mb-3 small">
        For any assistance, contact us at <strong>support@yourapp.com</strong>.
      </footer>
    </Container>
  );
};

export default Account;
