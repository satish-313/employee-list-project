import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useGctx } from "./context";
import {Container} from "react-bootstrap"

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AddEmployee from './components/AddEmployee';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList'
import Logout from './pages/Logout'

const App = () => {
  const { auth } = useGctx();
  console.log('auth',auth)

  return (
    <BrowserRouter>
      <Container fluid>
        <Navbar/>
      </Container>
      <Switch>
        <Route exact path="/">
          {auth ? <Home/> : <Login/>}
        </Route>
        <Route exact path="/add-employee">
          {auth ? <AddEmployee/> : <Login/>}
        </Route>
        <Route exact path="/employee-list">
          {auth ? <EmployeeList/> : <Login/>}
        </Route>
        <Route exact path="/logout">
          {auth ? <Logout/> : <Login/>}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registration">
          <Registration />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
