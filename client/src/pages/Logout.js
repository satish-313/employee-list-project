import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import {useGctx} from '../context'

const Logout = () => {
  const {setAuth} = useGctx();

  const log = () => {
    localStorage.removeItem('token')
    setAuth(false)
    window.location.href="/login"
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center margin-top">
            <Button size="lg" variant="primary" onClick={() => log()}>
              logout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Logout;
