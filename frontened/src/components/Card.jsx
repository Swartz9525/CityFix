import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AnimatedCard = ({ title, description, image }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      animate={{ x: [0, 50, -50, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      onClick={() => navigate("/services")}
      style={{ cursor: "pointer" }}
    >
      <Card
        className="shadow-lg rounded"
        style={{ width: "18rem", transition: "0.3s" }}
      >
        <Card.Img variant="top" src={image} height="200" />
        <Card.Body>
          <Card.Title className="text-decoration-underline">{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button variant="success" onClick={() => navigate("/services")}>
            Learn More
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

const CardContainer = () => {
  return (
    <Container className="py-5 bg-dark text-light" fluid>
      <Row className="justify-content-center g-4">
        <Col md={4} sm={6}>
          <AnimatedCard
            title="Water Problem"
            description="Issues related to water supply and quality."
            image="https://tse3.mm.bing.net/th?id=OIP.abJMVm1zdgZ5uCfRbh3LWQHaEo&pid=Api&P=0&h=220"
          />
        </Col>
        <Col md={4} sm={6}>
          <AnimatedCard
            title="Electricity Problem"
            description="Frequent power cuts and electrical faults."
            image="https://tse3.mm.bing.net/th?id=OIP.gJMNGnvNzLPzkNsugQLg1QHaEK&pid=Api&P=0&h=220"
          />
        </Col>
        <Col md={4} sm={6}>
          <AnimatedCard
            title="Road Problem"
            description="Damaged roads causing inconvenience."
            image="https://tse4.mm.bing.net/th?id=OIP.TUDvJXvN5d0ujSumnpkY1wHaEo&pid=Api&P=0&h=220"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CardContainer;
