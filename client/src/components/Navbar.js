import React from "react";
import {Nav, Navbar} from 'react-bootstrap'
import {useGctx} from '../context'


const Navbars = () => {
  const {auth} = useGctx()
  let navbody;

  if(auth){
    navbody = <>
    <Navbar sticky="top" bg="dark" variant="primary">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/employee-list">EmployeeList</Nav.Link>
        <Nav.Link href="/add-employee">addEmployee</Nav.Link>
      </Nav>
      <Nav className="justify-content-end">
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Nav>
    </Navbar>
  </>
  }
  else{
    navbody = <>
    <Navbar sticky="top" bg="dark" variant="primary">
      <Nav className="mr-auto">
        <Nav.Link href="/login">login</Nav.Link>
        <Nav.Link href="/registration">registration</Nav.Link>
      </Nav>
    </Navbar>
    </>
  }
  return (
    <>
      {navbody}
    </>
  );
};

export default Navbars;
