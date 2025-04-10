// src/pages/Dashboard.js
import React from "react";
import CarouselSection from "../components/Carousel";
import CardContainer from "../components/Card";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <main style={{ backgroundColor: "#f4f4f4", color: "#212529" }}>
      {/* Hero Section */}
      <section
        className="py-5 text-center"
        style={{ backgroundColor: "#ffffff" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="display-4 fw-bold" style={{ color: "#80ed99" }}>
            Welcome to City Issue Tracker
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Empowering citizens to report public issues — track problems like
            water shortages, power failures, damaged roads, and more with ease.
          </p>
          <Button variant="success" size="lg" className="mt-3">
            Raise an Issue
          </Button>
        </motion.div>
      </section>

      {/* Carousel Section */}
      <section className="my-5">
        <CarouselSection />
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="fw-bold mb-3" style={{ color: "#28a745" }}>
                  Why Use This Platform?
                </h2>
                <p className="text-muted">
                  We offer a hassle-free way for you to raise local issues and
                  get them addressed quickly. Every issue is tracked and updated
                  regularly.
                </p>
                <ul className="text-muted ps-3">
                  <li>✔ Easy complaint submission</li>
                  <li>✔ Transparent progress tracking</li>
                  <li>✔ Secure & verified reports</li>
                </ul>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://img.freepik.com/free-vector/public-transport-concept-illustration_114360-9587.jpg"
                  alt="Reporting Illustration"
                  className="img-fluid rounded shadow"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Cards Section */}
      <section className="py-5" style={{ backgroundColor: "#f4f4f4" }}>
        <Container>
          <h2 className="text-center fw-bold mb-4" style={{ color: "#28a745" }}>
            Reportable Issues
          </h2>
          <CardContainer />
        </Container>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 text-center"
        style={{ backgroundColor: "#ffffff" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="fw-bold mb-3">Be the change in your community!</h3>
          <p className="text-muted mb-4">
            Join hundreds of citizens in making your city better and more
            responsive.
          </p>
          <Button variant="success" size="lg">
            Start Reporting Now
          </Button>
        </motion.div>
      </section>
    </main>
  );
};

export default Dashboard;
