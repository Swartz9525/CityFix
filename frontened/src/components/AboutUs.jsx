import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <Container className="mt-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="p-4 bg-dark text-white shadow-lg text-center">
          <h2 className="text-success fw-bold">About City Fix</h2>
          <p className="text-muted">
            City Fix is a platform dedicated to improving urban infrastructure
            by allowing citizens to report problems related to water,
            electricity, and roads efficiently.
          </p>
        </Card>

        <Row className="mt-4">
          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="p-4 bg-dark text-white shadow-lg text-center">
                <h4 className="text-success">Our Mission</h4>
                <p>
                  Our mission is to bridge the gap between citizens and
                  municipal corporations, ensuring that infrastructure issues
                  are addressed promptly and efficiently.
                </p>
                <p>
                  We aim to empower communities by providing them with a
                  seamless platform to voice their concerns and see real change
                  happen in their cities.
                </p>
              </Card>
            </motion.div>
          </Col>

          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="p-4 bg-dark text-white shadow-lg text-center">
                <h4 className="text-success">Our Vision</h4>
                <p>
                  We envision a city where residents can report infrastructure
                  issues with ease, leading to a better, cleaner, and more
                  organized urban environment.
                </p>
                <p>
                  Our goal is to create a future where urban problems are
                  addressed swiftly, and every citizen feels heard and valued in
                  city development.
                </p>
              </Card>
            </motion.div>
          </Col>

          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Card className="p-4 bg-dark text-white shadow-lg text-center">
                <h4 className="text-success">Why Choose Us?</h4>
                <ul className="list-unstyled">
                  <li>✔ Easy reporting of issues in just a few clicks</li>
                  <li>✔ Faster response from municipal authorities</li>
                  <li>✔ Real-time tracking of reported problems</li>
                  <li>
                    ✔ Community-driven platform for better city management
                  </li>
                  <li>✔ Transparency in issue resolution</li>
                  <li>✔ Engaging local communities for active participation</li>
                </ul>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default AboutUs;
