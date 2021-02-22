import React, { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center margin-top">
            <Link to="/employee-list">
              <Button size="lg" variant="primary">Employee List</Button>
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="text-center">
            <Link to="/add-employee">
              <Button size='lg' variant="primary">Add Employee</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
