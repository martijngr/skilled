import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home/home";
import Vacancies from "./../pages/vacancies/vacancies";
import Header from "../components/site-layout/header/header";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route path="/vacatures" component={Vacancies} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
