import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Container className="mt-5 d-flex justify-content-center px-3">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%", maxWidth: "550px" }}
      >
        <Card
          className="p-4"
          style={{
            backgroundColor: "#343a40",
            borderRadius: "20px",
            border: "1px solid #444",
            color: "#fff",
          }}
        >
          <motion.h3
            className="text-center fw-bold mb-3"
            style={{ color: "#80ed99" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Contact Us
          </motion.h3>

          <motion.p
            className="text-center text-muted mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            We would love to hear from you!
          </motion.p>

          <Form onSubmit={handleSubmit}>
            {["name", "email", "subject", "message"].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
              >
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Form.Label>
                  {field === "message" ? (
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name={field}
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="bg-dark text-white border-secondary"
                    />
                  ) : (
                    <Form.Control
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="bg-dark text-white border-secondary"
                    />
                  )}
                </Form.Group>
              </motion.div>
            ))}

            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Button
                type="submit"
                style={{
                  backgroundColor: "#80ed99",
                  border: "none",
                  color: "#000",
                  fontWeight: "600",
                  padding: "10px 20px",
                  borderRadius: "10px",
                }}
                className="w-100"
              >
                Send Message
              </Button>
            </motion.div>
          </Form>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ContactUs;
