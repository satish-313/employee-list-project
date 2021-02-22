import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";

const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);

  const fetchEmployeList = async () => {
    const res = await fetch("http://localhost:4500/user/");
    const data = await res.json();
    // console.log(data);
    setEmployee(data);
  };

  useEffect(() => {
    fetchEmployeList();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h6 className="form-title">Employee list</h6>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>sn.</th>
                <th>name</th>
                <th>age</th>
                <th>salary</th>
                <th>phone number</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((e, index) => {
                const { name, age, salary, phoneNumber } = e;
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{salary}</td>
                    <td>{phoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeList;
