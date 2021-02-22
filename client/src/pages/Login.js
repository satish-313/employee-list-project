import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import {useGctx} from '../context'

const Login = () => {
  const [values, setValues] = useState({
    EmailOrPhone: "",
    password: "",
  });

  const {setAuth} = useGctx();

  const [err, setErr] = useState({});

  const [loading, setLoading] = useState(false);

  const submitLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch("http://localhost:4500/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      
      if(data.auth){
        setAuth(true)
        localStorage.setItem('token',data.token)
        window.location.href = '/'
      }

      if (data.error) {
        // console.log(data);
        setErr(data.errors);
      }
    } catch (error) {
      setLoading(false)
   }
    setLoading(false)
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h6 className="form-title">Login..</h6>
          <Form onSubmit={submitLoginForm}>
            <Form.Group>
              <Form.Label
                className={`${err.EmailOrPhone ? "text-danger" : ""}`}
              >
                {err.EmailOrPhone ? err.EmailOrPhone : "EmailOrPhone"}
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your EmailOrPhone.."
                value={values.EmailOrPhone}
                className={`${err.EmailOrPhone ? "is-invalid" : ""}`}
                onChange={(e) =>
                  setValues({ ...values, EmailOrPhone: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className={`${err.password ? "text-danger" : ""}`}>
                {err.password ? err.password : "Password"}
              </Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter your password.."
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className={`${err.password ? "is-invalid" : ""}`}
              />
            </Form.Group>

            <div className="text-center">
              <Button disabled={loading} variant="success" type="submit">
                {loading ? "loading.." : "Login"}
              </Button>
              <br />
              <small>
                Don't have account signup? <Link to="/registration">registration</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
