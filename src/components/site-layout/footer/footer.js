import React, { Component } from "react";
require("./footer.scss");

class Footer extends Component {
  render() {
    return (
      <div className="row footer">
        <div className="col-md-3">
          <div className="footer--title">service</div>
          <ul>
            <li>FAQ</li>
            <li>Inloggen / registreren</li>
          </ul>
        </div>
        <div className="col-md-3">
          <div className="footer--title">how about that</div>
          <ul>
            <li>How it works</li>
            <li>Over ons</li>
          </ul>
        </div>
        <div className="col-md-3">
          <div className="footer--title">contact</div>
          <ul>
            <li>email@adres.nu</li>
            <li>06-17 454 789</li>
          </ul>
        </div>
        <div className="col-md-3">
          <div className="footer--title">Social</div>
          <ul>
            <li>FAQ</li>
            <li>Inloggen / registreren</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
