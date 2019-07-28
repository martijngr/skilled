import React, { Component } from "react";

require("./header.scss");

class Header extends Component {
  state = {};

  render() {
    return (
      <div className="row">
        <div className="col-md-12 page-header--image">
          <div className="page-header--header">
            <div className="page-header--header-title">de vacaturesite</div>
            <div className="page-header--header-subtitle">
              waarbij je zoekt op jouw talenten!
            </div>

            <div className="page-header--header-statement">
              <span>find</span> <span>your</span> <span>future</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
