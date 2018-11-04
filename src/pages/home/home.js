import React, { Component } from "react";
import Header from "../../components/site-layout/header/header";
import Footer from "../../components/site-layout/footer/footer";
import searchIcon from "../../assets/icons/icon-search.png";
require("./home.scss");

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row home--header-image">
          <div className="col-md-3" />
          <div className="col-md-6 ">
            <div className="home--header">
              <div className="home--header-title">de vacaturesite</div>
              <div className="home--header-subtitle">
                waarbij je zoekt op jouw talenten!
              </div>
              <div className="home--header-search-box">
                <div className="home--header-search-box--input">
                  {/* <SkillFinder
                    onSearch={this.onSearch}
                    onClose={this.onClose}
                    onEnterPress={this.onEnterPress}
                  /> */}
                  <input type="text" />
                </div>
                <div className="home--header-search-box--icon">
                  <img src={searchIcon} onClick={this.doSearch} />
                </div>
                <br />
              </div>
              <div />
              <div className="home--header-statement">
                <span>find</span> <span>your</span> <span>future</span>
              </div>
            </div>
          </div>
          <div className="col-md-3" />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
