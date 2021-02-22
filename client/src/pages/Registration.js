import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

// components
// import useFrom from "../components/formhook";

const Registration = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState({});

  const [loading, setLoading] = useState(false);

  const submitRegistrationForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4500/user/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data.error) {
        console.log(data);
        setErr(data.errors);
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h6 className="form-title">Registration...</h6>
          <Form onSubmit={submitRegistrationForm}>
            <Form.Group>
              <Form.Label className={`${err.name ? "text-danger" : ""}`}>
                {err.name ? err.name : "Name"}
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name.."
                value={values.name}
                className={`${err.name ? "is-invalid" : ""}`}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={`${err.email ? "text-danger" : ""}`}>
                {err.email ? err.email : "Email"}
              </Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email.."
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className={`${err.email ? "is-invalid" : ""}`}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={`${err.phone ? "text-danger" : ""}`}>
                {err.phone ? err.phone : "Phone"}
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your phone.."
                value={values.phone}
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                className={`${err.phone ? "is-invalid" : ""}`}
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
            <Form.Group>
              <Form.Label
                className={`${err.confirmPassword ? "text-danger" : ""}`}
              >
                {err.confirmPassword ? err.confirmPassword : "Confirm password"}
              </Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter your password.."
                value={values.confirmPassword}
                onChange={(e) =>
                  setValues({ ...values, confirmPassword: e.target.value })
                }
                className={`${err.confirmPassword ? "is-invalid" : ""}`}
              />
            </Form.Group>
            <div className="text-center">
              <Button disabled={loading} variant="success" type="submit">
                {loading ? "loading.." : "Register"}
              </Button>
              <br />
              <small>
                Already have an account? <Link to="/login">login</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
