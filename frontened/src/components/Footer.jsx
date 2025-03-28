import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-4">
      <Container>
        <Row className="gy-4">
          {/* Logo & Description */}
          <Col xs={12} md={4}>
            <h5 className="text-success fw-bold">CityFix</h5>
            <p>
              Full-Stack Developer | Passionate about coding & problem-solving.
            </p>
          </Col>

          {/* Quick Links */}
          <Col xs={6} md={2}>
            <h6 className="text-success mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </Col>

          {/* Social Media Links */}
          <Col xs={6} md={2}>
            <h6 className="text-success mb-3">Follow Me</h6>
            <div className="d-flex gap-3">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                className="text-success fs-4"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                className="text-success fs-4"
              >
                <FaLinkedin />
              </a>
              <a href="#" target="_blank" className="text-success fs-4">
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                className="text-success fs-4"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-success fs-4"
              >
                <FaEnvelope />
              </a>
            </div>
          </Col>

          {/* Newsletter Subscription */}
          <Col xs={12} md={4}>
            <h6 className="text-success mb-3">Stay Updated</h6>
            <p>Subscribe to my newsletter for updates.</p>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="me-2"
              />
              <Button variant="success">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        {/* Copyright Section */}
        <div className="text-center mt-4">
          <p>© {new Date().getFullYear()} @CityFix. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
