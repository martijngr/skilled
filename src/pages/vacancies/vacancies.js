import React, { Component } from "react";
import Header from "../../components/site-layout/header/header";
import TalentService from "./../../services/api/TalentService";
import VacancyService from "./../../services/api/VacancyService";
import Skillset from "../../components/skillset/skillset";
require("./vacancies.scss");
// import logo1 from "../../img/logo-feyenoord.png";
import queryString from "query-string";
// import Resultblock from "./resultblock/resultblock";

class Vacancies extends Component {
  constructor(props) {
    super(props);

    this.vacancyService = new VacancyService();
    this.talentService = new TalentService();

    //this.onSearchClick = this.onSearchClick.bind(this);
  }

  state = {
    results: [],
    queryStringTalent: {}
  };

  componentDidMount() {
    console.log(this.props.location);

    const that = this;
    const queryParams = queryString.parse(this.props.location.search);
    console.log("searching query talent..." + queryParams.talent);
    this.talentService.search(queryParams.talent).then(function(resp) {
      if (resp && resp.result && resp.result.length > 0) {
        console.log("finished searching query talent", resp.result);
        that.setState({
          queryStringTalent: resp.result
        });
      }
    });
  }

  //   onSearchClick(searchPrefs) {
  //     this.performSearch(searchPrefs);
  //   }

  //   performSearch(searchPrefs) {
  //     this.vacancyService
  //       .search(
  //         searchPrefs.talents,
  //         searchPrefs.hoursPerWeek,
  //         searchPrefs.thinkLevel,
  //         searchPrefs.zipcode,
  //         searchPrefs.travelTime
  //       )
  //       .then(res => {
  //         this.setState({
  //           results: res.result
  //         });
  //       });
  //   }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="row">
          <div className="col-md-3 results-skillset">
            <Skillset
              initialTalent={this.state.queryStringTalent}
              onSearchClick={this.onSearchClick}
            />
          </div>
          <div className="col-md-9 results-content">
            <div className="row">
              <div className="col-md-12 result-bucket-bar">
                <div className="result-buckat-bar--filter-text">Filter op</div>
                <div className="result-buckat-bar--dropdown">
                  <select className="custom-select">
                    <option># Kies je bucket</option>
                    <option># Favorieten</option>
                    <option># Saai</option>
                    <option># Twijfelachtig</option>
                  </select>
                </div>
                <div className="result-buckat-bar--button">
                  <div>Naar mijn buckets ></div>
                </div>
              </div>
            </div>
            <div className="results-overview">
              {/* {this.state.results.map(v => (
                <Resultblock key={v.Id} vacancy={v} />
              ))} */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Vacancies;
