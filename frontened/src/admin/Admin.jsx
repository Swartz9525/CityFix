import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./admin.css";
import {
  Table,
  Button,
  Spinner,
  Alert,
  Badge,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AdminPanel = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://city-fix-backend.vercel.app//api/reports"
      );
      setReports(res.data);
    } catch (err) {
      setMessage("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    try {
      await axios.put(
        `https://city-fix-backend.vercel.app//api/reports/${id}/status`,
        {
          status: newStatus,
        }
      );
      setReports((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      setMessage("Error updating status");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const totalReports = reports.length;
  const completedReports = reports.filter(
    (r) => r.status === "Completed"
  ).length;
  const pendingReports = reports.filter((r) => r.status === "Pending").length;

  const chartData = [
    { name: "Completed", value: completedReports },
    { name: "Pending", value: pendingReports },
  ];

  return (
    <>
      <motion.div
        className="container mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-3 text-center fw-bold">
          ⚙️ Admin Panel - Service Reports
        </h2>

        <motion.p
          className="text-muted text-center fs-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to your powerful admin dashboard! 🚀 Here, you can seamlessly
          manage service reports, monitor progress, and gain valuable insights
          in real-time. 📊 Track pending and completed tasks efficiently with
          detailed analytics and intuitive visualizations.
        </motion.p>

        <motion.div
          className="text-center mt-3"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Badge bg="info" className="p-2 px-3">
            Stay Organized, Stay Ahead! ✅
          </Badge>
        </motion.div>

        {/* Feature Highlights */}
        <Row className="mt-4">
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold">📌 Real-Time Updates</h5>
                  <p className="text-muted">
                    Monitor service reports with instant status changes and
                    dynamic analytics.
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold">📊 Interactive Charts</h5>
                  <p className="text-muted">
                    Visualize data efficiently with detailed bar and pie charts.
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold">⚡ One-Click Actions</h5>
                  <p className="text-muted">
                    Update report status effortlessly with a single click.
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
        {message && (
          <Alert variant="danger" className="mt-3">
            {message}
          </Alert>
        )}

        {/* Rest of the Code Below */}
      </motion.div>

      <div className="container mt-4">
        <h3 className="mb-4">Admin Panel - Service Reports</h3>

        {message && <Alert variant="danger">{message}</Alert>}

        {/* Report Summary */}
        <Row className="mb-4">
          <Col md={4}>
            <Card bg="primary" text="white" className="text-center">
              <Card.Body>
                <Card.Title>Total Reports</Card.Title>
                <Card.Text style={{ fontSize: "1.8rem" }}>
                  {totalReports}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card bg="success" text="white" className="text-center">
              <Card.Body>
                <Card.Title>Completed</Card.Title>
                <Card.Text style={{ fontSize: "1.8rem" }}>
                  {completedReports}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card bg="warning" text="dark" className="text-center">
              <Card.Body>
                <Card.Title>Pending</Card.Title>
                <Card.Text style={{ fontSize: "1.8rem" }}>
                  {pendingReports}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <h5 className="mb-3">Status Pie Chart</h5>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <linearGradient
                          id="completedGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#28a745"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor="#145c2f"
                            stopOpacity={1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="pendingGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#ffc107"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor="#a68b00"
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={50}
                        label
                      >
                        <Cell fill="url(#completedGrad)" />
                        <Cell fill="url(#pendingGrad)" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Body>
                <h5 className="mb-3">Status Bar Chart</h5>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Reports" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Table */}
        {/* Enhanced Table View */}
        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <div
            className="table-responsive shadow rounded"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <Table
              striped
              bordered
              hover
              responsive
              className="align-middle mb-0 table-hover"
            >
              <thead className="sticky-top bg-dark text-light">
                <tr className="text-center">
                  <th>Ref No.</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Toggle</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id} className="text-center align-middle">
                    <td className="fw-semibold">{report.referenceNumber}</td>
                    <td>{report.title}</td>
                    <td
                      style={{
                        maxWidth: "200px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={report.description}
                    >
                      {report.description}
                    </td>
                    <td
                      style={{
                        maxWidth: "180px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={report.address}
                    >
                      {report.address}
                    </td>
                    <td>{report.contact}</td>
                    <td>{new Date(report.dateTime).toLocaleString()}</td>
                    <td>
                      <Badge
                        pill
                        bg={
                          report.status === "Completed" ? "success" : "warning"
                        }
                      >
                        {report.status}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant={
                          report.status === "Pending"
                            ? "outline-success"
                            : "outline-secondary"
                        }
                        size="sm"
                        onClick={() =>
                          handleStatusToggle(report._id, report.status)
                        }
                      >
                        Mark as{" "}
                        {report.status === "Pending" ? "Completed" : "Pending"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
