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
import TalentSelector from '../../components/talent-selector/TalentSelector';
import CultureSelector from "../../components/culture-selector/CultureSelector";
import VacancySearchButton from "../../components/vacancy-search-button/VacancySearchButton";

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
    this.setSearchResultsTotal = this.setSearchResultsTotal.bind(this);

    this.setContentAreaTo = this.setContentAreaTo.bind(this);
  }

  state = {
    results: [],
    queryStringTalent: {},
    isVacancyModelOpen: false,
    selectedVacancyId: '',
    selectedTalents: [],
    area: '',
    motivations: [],
    cultures: [],
    searchCount: 0,
    searchCriteria: {},
    talents: [],
  };

  componentDidMount() {
    const that = this;
    const queryParams = queryString.parse(this.props.location.search);
    
    this.talentService.search(queryParams.talent).then(function(resp) {
      if (resp && resp.result && resp.result.length > 0) {
        that.setState({
          queryStringTalent: resp.result
        });
      }
    });

    this.talentService.search().then(res => {
      this.setState({
        talents: res.result
      });
    });

    this.vacancyService.getMotivations().then(function(resp) {
      that.setState({
        motivations: resp
      });
    });

    this.vacancyService.getCompanyCultures().then(function(resp) {
      that.setState({
        cultures: resp
      });
    });
  }

  setContentAreaTo(name){
    this.setState({area: name});
  }

  onTalentSelected(talent){
    var index = this.state.talents.findIndex(m => m.Id == talent.Id);
    var talentsCopy = [...this.state.talents];
    var talentOnIndex = talentsCopy[index];
    
    if(!talentOnIndex.hasOwnProperty('checked'))
      talentOnIndex.checked= true;
    else
      talentOnIndex.checked = talent.checked;

    talentsCopy[index] = talentOnIndex;
    this.setState({talents: talentsCopy}, this.setSearchResultsTotal());
  }

  setSearchResultsTotal(criteria) {
    if(!criteria)
      criteria = this.state.searchCriteria;

    var that = this;
    var talents = that.state.talents.filter(t => t.checked);
    this.setState({
      searchCriteria: criteria
    });

    this.vacancyService
      .searchCount(
        talents,
        criteria.hoursPerWeek,
        criteria.thinkLevel,
        criteria.zipcode,
        criteria.travelTime,
        this.state.motivations.filter(t => t.checked),
        this.state.cultures.filter(t => t.checked)
      )
      .then(resp => {
        that.setState({
          searchCount: resp.count
        });
      });
  }

  performSearch() {
    this.vacancyService
      .search(
        this.state.talents.filter(t => t.checked),
        this.state.searchCriteria.hoursPerWeek,
        this.state.searchCriteria.thinkLevel,
        this.state.searchCriteria.zipcode,
        this.state.searchCriteria.travelTime,
        this.state.motivations.filter(t => t.checked),
        this.state.cultures.filter(t => t.checked)
      )
      .then(res => {
        this.setState({
          results: res.result,
          area: ''
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
          var index = this.state.motivations.findIndex(m => m.Id == motivation.Id);

          var motivations = [...this.state.motivations];
          motivations[index] = motivation;

          this.setState({motivations: motivations}, this.setSearchResultsTotal());
        }}
      ></MotivationsSelector>
    );
  }

  getCultureSelector(){
    return(
      <CultureSelector
        cultures = {this.state.cultures}
        onCultureClick={(culture) => {
          var index = this.state.cultures.findIndex(m => m.Id == culture.Id);

          var cultures = [...this.state.cultures];
          cultures[index] = culture;

          this.setState({cultures: cultures}, this.setSearchResultsTotal());
        }}
      ></CultureSelector>
    );
  }
  
  getTalentSelector(){
    return(
      <TalentSelector
        talents = {this.state.talents}
        onTalentClick={this.onTalentSelected}
        maxCheckCount={5}
      ></TalentSelector>
    );
  }

  renderSelectedMotivations(){
    return(
      this.state.motivations.map(t => (
        t.checked && 
        <SelectedItem 
          key={t.Id} 
          caption={t.Name} 
          id={t.Id} 
          data={t}
          onItemRemoved={(item) => {
            var motivation = item.data;
            motivation.checked = false;
            var index = this.state.motivations.findIndex(m => m.Id == motivation.Id);

            var motivations = [...this.state.motivations];
            motivations[index] = motivation;

            this.setState({motivations: motivations}, this.setSearchResultsTotal());
          }}/>
      ))
    );
  }

  renderSelectedCultures(){
    return(
      this.state.cultures.map(t => (
        t.checked && 
        <SelectedItem 
          key={t.Id} 
          caption={t.Name} 
          id={t.Id} 
          data={t}
          onItemRemoved={(item) => {
            var culture = item.data;
            culture.checked = false;
            var index = this.state.cultures.findIndex(m => m.Id == culture.Id);

            var cultures = [...this.state.cultures];
            cultures[index] = culture;

            this.setState({cultures: cultures}, this.setSearchResultsTotal());
          }}/>
      ))
    );
  }

  renderSelectedTalents(){
    return(
      
      this.state.talents.map(t => (
        t.checked && 
        <SelectedItem 
          key={t.Id} 
          caption={t.Name} 
          id={t.Id} 
          data={t}
          onItemRemoved={(item) => {
            var talent = item.data;
            talent.checked = false;
            var index = this.state.talents.findIndex(m => m.Id == talent.Id);

            var talents = [...this.state.talents];
            talents[index] = talent;
            this.setState({talents: talents}, this.setSearchResultsTotal());
          }}/>
      ))
    );
  }

  render() {
    if (!this.state.talents || this.state.talents.length == 0){
      return <div>Loading...</div>
    }

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
              setSearchResultsTotal={this.setSearchResultsTotal}
              searchCount={this.state.searchCount}
              onSearchClick={this.performSearch}
              onTalentClick={this.setContentAreaTo}
              talents = {this.state.talents}
            />
          </div>
          <div className="col-md-9 results-content">
            <div className="row">
              <div className="col-md-12 results-selected-talents--overview">
                {this.renderSelectedTalents()}
                {this.renderSelectedMotivations()}
                {this.renderSelectedCultures()}
                <VacancySearchButton 
                  searchCount={this.state.searchCount}
                  onSearchClick={this.performSearch}
                  isSticky={true}></VacancySearchButton>
              </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                  <div id="content-area">
                    {this.state.area == '' && <VacancyResults results={this.state.results}></VacancyResults>}
                    {this.state.area == 'motivations' && this.getMotivationSelector()}
                    {this.state.area == 'culture' && this.getCultureSelector()}
                    {this.state.area == 'talent' && this.getTalentSelector()}
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