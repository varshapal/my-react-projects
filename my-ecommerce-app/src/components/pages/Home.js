import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import Header from "../Header";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <section>
      <div className={classes.home}>
        <h1>The Generics</h1>
        <Button variant="outline-info">Get Our Latest Album</Button>
      </div>
      <Container className={classes.container}>
        <Row><h2>Tours</h2>
          <Col md={12}>
            <ListGroup>
              <ListGroup.Item>
                <span>JUL16</span>
                <span>DETROIT, MI</span>
                <span>DTE ENERGY MUSIC THEATRE</span>
                <Button variant="primary">BUY TICKETS</Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>JUL19</span>
                <span>TORONTO,ON</span>
                <span>BUDWEISER STAGE</span>
                <Button variant="primary">BUY TICKETS</Button>
              </ListGroup.Item>
              <ListGroup.Item>
              <span>JUL22</span>
                <span>BRISTOW, VA</span>
                <span>JIGGY LUBE LIVE</span>
                <Button variant="primary">BUY TICKETS</Button>
              </ListGroup.Item>
              <ListGroup.Item>
              <span>JUL29</span>
                <span>PHOENIX, AZ</span>
                <span>AK-CHIN PAVILION</span>
                <Button variant="primary">BUY TICKETS</Button>
              </ListGroup.Item>
              <ListGroup.Item>
              <span>AUG 2</span>
                <span>LAS VEGAS, NV</span>
                <span>T-MOBILE ARENA</span>
                <Button variant="primary">BUY TICKETS</Button>
              </ListGroup.Item>
              <ListGroup.Item>
              <span>AUG 7</span>
                <span>CONCORD, CA</span>
                <span>CONCORD PAVILION</span>
                <Button variant="primary">BUY TICKETS</Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
