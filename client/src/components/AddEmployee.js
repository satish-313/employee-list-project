import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

const AddEmployee = () => {
  const [values, setValues] = useState({
    name: "",
    age: "",
    salary: "",
    phoneNumber: "",
  });

  const [err, setErr] = useState({});

  const [loading, setLoading] = useState(false);

  const AddEmployeeForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4500/user/add-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      console.log("data", data);

      if (data.error) {
        // console.log(data);
        setErr(data.errors);
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={8} md={6} lg={6}>
          <h6 className="form-title">Add Employee..</h6>
          <Form onSubmit={AddEmployeeForm}>
            <Form.Group>
              <Form.Label className={`${err.name ? "text-danger" : ""}`}>
                {err.name ? err.name : "name"}
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter employee name"
                value={values.name}
                className={`${err.name ? "is-invalid" : ""}`}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className={`${err.age ? "text-danger" : ""}`}>
                {err.name ? err.age : "age"}
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter employee age"
                value={values.age}
                className={`${err.age ? "is-invalid" : ""}`}
                onChange={(e) => setValues({ ...values, age: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className={`${err.salary ? "text-danger" : ""}`}>
                {err.salary ? err.salary : "salary"}
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter employee salary"
                value={values.salary}
                className={`${err.salary ? "is-invalid" : ""}`}
                onChange={(e) =>
                  setValues({ ...values, salary: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className={`${err.phoneNumber ? "text-danger" : ""}`}>
                {err.phoneNumber ? err.phoneNumber : "phone number"}
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter employee phone number"
                value={values.phoneNumber}
                className={`${err.phoneNumber ? "is-invalid" : ""}`}
                onChange={(e) =>
                  setValues({ ...values, phoneNumber: e.target.value })
                }
              />
            </Form.Group>
            <div className="text-center">
              <Button disabled={loading} variant="success" type="submit">
                {loading ? "loading.." : "Add employee"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEmployee;
