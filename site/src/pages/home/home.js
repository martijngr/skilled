import React, { Component } from "react";
import Footer from "../../components/site-layout/footer/footer";
import searchIcon from "../../assets/icons/icon-search.png";
import TalentTypeahead from "../../components/talent-typeahead/talent-typehead";

require("./home.scss");

class Home extends Component {
  constructor(props) {
    super(props);

    this.toVacancies = this.toVacancies.bind(this);

    this.state = {
      talent: {}
    };
  }

  toVacancies = function(talent) {
    this.props.history.push("/vacatures?talent=" + talent.Name);
    // this.props.history.push({
    //   pathname: "/vacatures",
    //   data: talent
    // });
  };

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
                  <TalentTypeahead onTalentSelected={this.toVacancies} />
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
