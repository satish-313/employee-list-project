import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/registration"><Registration/></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
