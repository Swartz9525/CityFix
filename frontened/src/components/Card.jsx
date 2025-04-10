import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AnimatedCard = ({ title, description, image, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="h-100"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
    >
      <Card
        className="shadow rounded-4 border-0 h-100"
        style={{ backgroundColor: "#1f1f1f", color: "#fff" }}
        onClick={() => navigate("/services")}
      >
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          className="img-fluid rounded-top-4"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="fw-bold fs-5 text-success">
              {title}
            </Card.Title>
            <Card.Text className="text-light-emphasis">{description}</Card.Text>
          </div>
          <Button
            variant="success"
            className="mt-3 rounded-3"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/services");
            }}
          >
            Learn More
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

const CardContainer = () => {
  return (
    <div style={{ backgroundColor: "#343a40" }}>
      <Container className="py-5 text-light">
        <motion.h2
          className="text-center mb-5 fw-bold"
          style={{ color: "#80ed99" }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Common Issues We Handle
        </motion.h2>

        <Row className="justify-content-center g-4 px-3">
          <Col xs={12} sm={6} md={4}>
            <AnimatedCard
              index={0}
              title="Water Problem"
              description="Issues related to water supply and quality."
              image="https://tse3.mm.bing.net/th?id=OIP.abJMVm1zdgZ5uCfRbh3LWQHaEo&pid=Api&P=0&h=220"
            />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <AnimatedCard
              index={1}
              title="Electricity Problem"
              description="Frequent power cuts and electrical faults."
              image="https://tse3.mm.bing.net/th?id=OIP.gJMNGnvNzLPzkNsugQLg1QHaEK&pid=Api&P=0&h=220"
            />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <AnimatedCard
              index={2}
              title="Road Problem"
              description="Damaged roads causing inconvenience."
              image="https://tse4.mm.bing.net/th?id=OIP.TUDvJXvN5d0ujSumnpkY1wHaEo&pid=Api&P=0&h=220"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CardContainer;
