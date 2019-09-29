import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home/home";
import Vacancies from "./../pages/vacancies/vacancies";
import Menu from "../components/site-layout/menu/menu";
require("./app.scss");

class App extends Component {
  render() {
    return (
      <div className="container-fluid h-100 d-flex flex-column">
        <Menu />
        <Switch>
          <Route path="/vacatures" component={Vacancies} />
          <Route path="/" component={Home} />
        </Switch>
        <div>
          &nbsp;
        </div>
      </div>
    );
  }
}

export default App;
