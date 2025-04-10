import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Spinner,
  Alert,
  Container,
  Card,
  Button,
  Row,
  Col,
  Badge,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaFileCsv, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import "animate.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://city-fix-backend.vercel.app/api/reports/users"
        );
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError("Unable to fetch user data. Please try again later.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const togglePassword = (id) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const csv = Papa.unparse(
      filteredUsers.map((user, idx) => ({
        No: idx + 1,
        Name: user.name,
        Email: user.email,
        Password: user.password,
        "Created At": new Date(user.createdAt).toLocaleString(),
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "user_list.csv";
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Name", "Email", "Password", "Created At"];
    const tableRows = [];

    filteredUsers.forEach((user, index) => {
      tableRows.push([
        index + 1,
        user.name,
        user.email,
        user.password,
        new Date(user.createdAt).toLocaleString(),
      ]);
    });

    doc.setFontSize(14);
    doc.text("Detailed User Report", 14, 15);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [128, 237, 153],
        textColor: 20,
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 35 },
        2: { cellWidth: 50 },
        3: { cellWidth: 35 },
        4: { cellWidth: 45 },
      },
      margin: { left: 10, right: 10 },
    });

    doc.save("user_report.pdf");
  };

  return (
    <Container className="mt-5 animate__animated animate__fadeIn">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <Spinner animation="border" variant="success" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <>
          <Row className="align-items-center mb-4">
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="🔍 Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <small className="text-muted">
                Filter results dynamically by typing a name or email. Instant
                search helps narrow down specific users.
              </small>
            </Col>
            <Col
              xs={12}
              md={6}
              className="mt-2 mt-md-0 text-md-end text-center"
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Download current list as CSV file</Tooltip>}
              >
                <Button
                  variant="outline-success"
                  onClick={exportCSV}
                  className="me-2"
                >
                  <FaFileCsv className="me-1" /> Export CSV
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Generate a printable PDF report</Tooltip>}
              >
                <Button variant="outline-danger" onClick={exportPDF}>
                  <FaFilePdf className="me-1" /> Export PDF
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>

          <Card
            className="shadow bg-dark text-light"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <Card.Header className="text-center fs-5 fw-bold">
              Registered Users Overview
            </Card.Header>
            <Card.Body>
              {filteredUsers.length === 0 ? (
                <p className="text-center text-muted">
                  No users found matching your search criteria. Try modifying
                  the input to broaden the result.
                </p>
              ) : (
                <>
                  <p className="text-muted mb-3">
                    Displaying <strong>{filteredUsers.length}</strong>{" "}
                    registered user(s). The table includes user details such as
                    full name, email address, password visibility toggle, and
                    registration timestamp.
                  </p>
                  <Table
                    responsive
                    bordered
                    hover
                    variant="dark"
                    className="text-center animate__animated animate__fadeInUp"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email Address</th>
                        <th>Password</th>
                        <th>Registration Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, idx) => (
                        <tr key={user._id}>
                          <td>
                            <Badge bg="secondary">{idx + 1}</Badge>
                          </td>
                          <td>
                            <strong>{user.name}</strong>{" "}
                            {new Date(user.createdAt).getTime() >
                              Date.now() - 86400000 && (
                              <Badge bg="success" pill className="ms-1">
                                New
                              </Badge>
                            )}
                          </td>
                          <td>{user.email}</td>
                          <td>
                            {showPasswords[user._id]
                              ? user.password
                              : "••••••••"}
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => togglePassword(user._id)}
                              className="ms-2 text-light"
                            >
                              {showPasswords[user._id] ? (
                                <FaEyeSlash />
                              ) : (
                                <FaEye />
                              )}
                            </Button>
                          </td>
                          <td>{new Date(user.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default User;
