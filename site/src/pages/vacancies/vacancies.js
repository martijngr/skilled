import React, { Component } from "react";
import TalentService from "./../../services/api/TalentService";
import VacancyService from "./../../services/api/VacancyService";
import Skillset from "../../components/skillset/skillset";
import queryString from "query-string";
import VacancyBlock from "../../components/vacancy-block/VacancyBlock";
import Modal from "react-modal";
import Vacancy from "../vacancy/vacancy";
import SelectedItem from "../../components/selected-item/selected-item";

import headerImage from "../../assets/img/results_header.png";

require("./vacancies.scss");

class Vacancies extends Component {
  constructor(props) {
    super(props);

    this.vacancyService = new VacancyService();
    this.talentService = new TalentService();

    this.performSearch = this.performSearch.bind(this);
    this.onVacancyClick = this.onVacancyClick.bind(this);
    this.closeVacancyModal = this.closeVacancyModal.bind(this);
  }

  state = {
    results: [],
    queryStringTalent: {},
    isVacancyModelOpen: false,
    selectedVacancyId: '',
    selectedTalents: []
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

  performSearch(searchPrefs) {
    this.vacancyService
      .search(
        searchPrefs.talents,
        searchPrefs.hoursPerWeek,
        searchPrefs.thinkLevel,
        searchPrefs.zipcode,
        searchPrefs.travelTime
      )
      .then(res => {
        this.setState({
          results: res.result,
          selectedTalents: searchPrefs.talents
        });
      });
  }

  onVacancyClick(vacancyId){
    if(!vacancyId) return;

    this.setState({
      selectedVacancyId: vacancyId,
      isVacancyModelOpen: true
    });
  }

  closeVacancyModal(){
    this.setState({
      isVacancyModelOpen: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            <img src={headerImage} className="results-header--image img-fluid"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 results-skillset">
            <Skillset
              initialTalent={this.state.queryStringTalent}
              onSearchClick={this.performSearch}
            />
          </div>
          <div className="col-md-9 results-content">
            <div className="row">
              <div className="col-md-12 results-selected-talents--overview">
                {this.state.selectedTalents.map(t => (
                  <SelectedItem key={t.Id} caption={t.Name} id={t.Id}/>
                ))}
              
            </div>
            
              </div>
              <div className="row">
                <div className="col-md-12">
                {this.state.results.map(v => (
                  <VacancyBlock key={v.Id} vacancy={v} onVacancyClick={this.onVacancyClick}/>
                ))}
                </div>
            </div>
            </div>
        </div>

        <Modal 
          isOpen={this.state.isVacancyModelOpen}
          onRequestClose={this.closeVacancyModal}>
            <Vacancy 
              vacancyId={this.state.selectedVacancyId} 
              selectedTalents={this.state.selectedTalents}
              key={this.state.selectedVacancyId}>
            </Vacancy>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Vacancies;