import React, { Component } from "react";
require("./menu.scss");

class Menu extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand header--top-logo" href="#">
              SKILLED.
            </a>
            {/* <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button> */}
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <div className="header--top-slogan">100% happy money making</div>
              {/* <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Registreren <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Inloggen
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Ik ben werkgever
                  </a>
                </li>
              </ul> */}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Menu;
