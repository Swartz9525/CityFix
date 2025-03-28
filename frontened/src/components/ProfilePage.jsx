import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const ProfilePage = () => {
  return (
    <Container fluid className="bg-light min-vh-100">
      <Row className="justify-content-center align-items-center py-5">
        <Col md={8} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Card className="shadow-lg rounded-lg p-4">
              {/* Profile Picture */}
              <div className="text-center">
                <motion.img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="rounded-circle mb-4"
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "4px solid #80ed99",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Name and Title */}
                <motion.h3
                  className="fw-bold text-dark"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  John Doe
                </motion.h3>
                <p className="text-muted">Web Developer</p>

                {/* Bio */}
                <motion.p
                  className="mt-3 text-muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Passionate about creating clean, responsive websites. I love
                  building user-friendly interfaces and learning new
                  technologies.
                </motion.p>

                {/* Social Links */}
                <div className="d-flex justify-content-center mt-4">
                  <a
                    href="https://github.com/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-3 text-dark"
                  >
                    <FaGithub size={30} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/johndoe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-3 text-dark"
                  >
                    <FaLinkedin size={30} />
                  </a>
                  <a
                    href="https://twitter.com/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-3 text-dark"
                  >
                    <FaTwitter size={30} />
                  </a>
                </div>

                {/* Edit Profile Button */}
                <div className="text-center mt-4">
                  <Button variant="outline-primary" href="/edit-profile">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
