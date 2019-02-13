import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home/home";
import Vacancies from "./../pages/vacancies/vacancies";
import Menu from "../components/site-layout/menu/menu";
import ComingSoon from "../pages/coming-soon/coming-soon";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Menu />
        <Switch>
          <Route path="/vacatures" component={Vacancies} />
          <Route path="/" component={ComingSoon} />
        </Switch>
      </div>
    );
  }
}

export default App;
