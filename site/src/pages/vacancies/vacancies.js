import React, { Component } from "react";
import TalentService from "./../../services/api/TalentService";
import VacancyService from "./../../services/api/VacancyService";
import Skillset from "../../components/skillset/skillset";
import queryString from "query-string";
import VacancyBlock from "../../components/vacancy-block/VacancyBlock";
import Modal from "react-modal";
import Vacancy from "../vacancy/vacancy";
import SelectedItem from "../../components/selected-item/selected-item";
import VacancyResults from "../../components/vacancy-results/VacancyResults";
import MotivationsSelector from "../../components/motivations-selector/MotivationsSelector";
import CultureSelector from "../../components/culture-selector/CultureSelector";

import headerImage from "../../assets/img/results_header.png";

require("./vacancies.scss");

class Vacancies extends Component {
  constructor(props) {
    super(props);

    this.vacancyService = new VacancyService();
    this.talentService = new TalentService();

    this.performSearch = this.performSearch.bind(this);
    this.onTalentSelected = this.onTalentSelected.bind(this);
    this.onVacancyClick = this.onVacancyClick.bind(this);
    this.closeVacancyModal = this.closeVacancyModal.bind(this);

    this.setContentAreaTo = this.setContentAreaTo.bind(this);
  }

  state = {
    results: [],
    queryStringTalent: {},
    isVacancyModelOpen: false,
    selectedVacancyId: '',
    selectedTalents: [],
    area: '',
    motivations: [
      {id: 1, text: 'abc'},
      {id: 2, text: 'def'},
      {id: 3, text: 'ghi'},
      {id: 4, text: 'jkl'}
    ],
    cultures: [
      {id: 11, text: 'cul1'},
      {id: 12, text: 'cul2'},
      {id: 13, text: 'cul3'},
      {id: 14, text: 'cul4'}
    ]
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

  setContentAreaTo(name){
    this.setState({area: name});
  }

  onTalentSelected(talent){
    console.log('onTalentSelected', talent);
    this.setState(prevState => ({
      selectedTalents: [...prevState.selectedTalents, talent]
    }))
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

  getMotivationSelector(){
    return(
      <MotivationsSelector
        motivations = {this.state.motivations}
        onMotivationClick={(motivation) => {
          var index = this.state.motivations.findIndex(m => m.id == motivation.id);

          var motivations = [...this.state.motivations];
          motivations[index] = motivation;

          this.setState({motivations: motivations});
        }}
      ></MotivationsSelector>
    );
  }

  getCultureSelector(){
    return(
      <CultureSelector
        cultures = {this.state.cultures}
        onCultureClick={(culture) => {
          var index = this.state.cultures.findIndex(m => m.id == culture.id);

          var cultures = [...this.state.cultures];
          cultures[index] = culture;

          this.setState({cultures: cultures});
        }}
      ></CultureSelector>
    );
  }

  renderSelectedTalents(){
    return(
      this.state.selectedTalents.map(t => (
        t.checked && 
        <SelectedItem 
          key={t.Id} 
          caption={t.Name} 
          id={t.Id}
          data={t}
          onItemRemoved={(item) => {
            var talent = item.data;
            var updatedTalents = this.state.selectedTalents.filter(m => m.Id != talent.Id);

            this.setState({selectedTalents: updatedTalents});
          }}/>
      ))
    );
  }

  renderSelectedMotivations(){
    return(
      this.state.motivations.map(t => (
        t.checked && 
        <SelectedItem 
          key={t.id} 
          caption={t.text} 
          id={t.id} 
          data={t}
          onItemRemoved={(item) => {
            var motivation = item.data;
            motivation.checked = false;
            var index = this.state.motivations.findIndex(m => m.id == motivation.id);

            var motivations = [...this.state.motivations];
            motivations[index] = motivation;

            this.setState({motivations: motivations});
          }}/>
      ))
    );
  }

  renderSelectedCultures(){
    return(
      this.state.cultures.map(t => (
        t.checked && 
        <SelectedItem 
          key={t.id} 
          caption={t.text} 
          id={t.id} 
          data={t}
          onItemRemoved={(item) => {
            var culture = item.data;
            culture.checked = false;
            var index = this.state.cultures.findIndex(m => m.id == culture.id);

            var cultures = [...this.state.cultures];
            cultures[index] = culture;

            this.setState({cultures: cultures});
          }}/>
      ))
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="row results-header">
          <div className="col-md-12 ">
            <img src={headerImage} className="results-header--image img-fluid"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 results-skillset">
            <Skillset
              initialTalent={this.state.queryStringTalent}
              onTalentSelected= {this.onTalentSelected}
              onSearchClick={this.performSearch}
              onMotivationsClick={this.setContentAreaTo}
              onCultureClick={this.setContentAreaTo}
            />
          </div>
          <div className="col-md-9 results-content">
            <div className="row">
              <div className="col-md-12 results-selected-talents--overview">
                {this.renderSelectedTalents()}
                {this.renderSelectedMotivations()}
                {this.renderSelectedCultures()}
              </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                  <div id="content-area">
                    {this.state.area == '' && <VacancyResults results={this.state.results}></VacancyResults>}
                    {this.state.area == 'motivations' && this.getMotivationSelector()}
                    {this.state.area == 'culture' && this.getCultureSelector()}
                  </div>
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