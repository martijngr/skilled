import React, { Component } from "react";
import TalentService from "./../../services/api/TalentService";
import VacancyService from "./../../services/api/VacancyService";
import Skillset from "../../components/skillset/skillset";
import queryString from "query-string";
import HeaderImage from "../../components/header-image/HeaderImage";
import Modal from "react-modal";
import Vacancy from "../vacancy/vacancy";
import SelectedItem from "../../components/selected-item/selected-item";
import VacancyResults from "../../components/vacancy-results/VacancyResults";
import MotivationsSelector from "../../components/motivations-selector/MotivationsSelector";
import TalentSelector from '../../components/talent-selector/TalentSelector';
import CultureSelector from "../../components/culture-selector/CultureSelector";
import VacancySearchButton from "../../components/vacancy-search-button/VacancySearchButton";

import headerImg from "../../assets/img/results_header.png";

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
    this.renderVacancyResults = this.renderVacancyResults.bind(this);

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

  init(){
    const queryParams = queryString.parse(this.props.location.search);

    this.talentService.search().then(res => {
      const talents = res.result;
      const queryStringTalent = queryParams.talent;

      var index = talents.findIndex(m => m.Name == queryStringTalent);
      var talentOnIndex = talents[index];
      talentOnIndex.checked= true;

      this.setState({
        talents: talents
      }, this.performSearch());
    });

    this.vacancyService.getMotivations().then(resp => {
      this.setState({
        motivations: resp
      });
    });

    this.vacancyService.getCompanyCultures().then(resp => {
      this.setState({
        cultures: resp
      });
    });
  }

  componentDidMount() {
    this.init();
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

  onVacancyClick(vacancy){
    var candidateTalenIds = this.state.talents.find(t => t.checked);
    console.log(candidateTalenIds);
    
    this.props.history.push("/vacature?id=" + vacancy.Id);
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
          key={t.Id+"sm"} 
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
          key={t.Id+"sc"} 
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
          key={t.Id+"st"} 
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

  renderVacancyResults(){
    return (
      <VacancyResults 
        results={this.state.results} 
        onVacancyClick={this.onVacancyClick}>
      </VacancyResults>
    );
  }

  render() {
    if (!this.state.talents || this.state.talents.length == 0){
      return <div>Loading...</div>
    }

    return (
      <div className="vacancies-container">
        <React.Fragment>
          <HeaderImage image={headerImg} />
        </React.Fragment>
        <div className="row d-none d-sm-flex">
          <div className="col results-skillset">
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
          <div className="col results-content">
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
                    {this.state.area == '' && this.renderVacancyResults()}
                    {this.state.area == 'motivations' && this.getMotivationSelector()}
                    {this.state.area == 'culture' && this.getCultureSelector()}
                    {this.state.area == 'talent' && this.getTalentSelector()}
                  </div>
                </div>
            </div>
            </div>
        </div>

        <div className="row d-sm-none">
          <div className="col">

            <div id="content-area">
              {this.state.area == '' && this.renderVacancyResults() }
              {this.state.area == 'motivations' && this.getMotivationSelector()}
              {this.state.area == 'culture' && this.getCultureSelector()}
              {this.state.area == 'talent' && this.getTalentSelector()}
              {this.state.area == 'criteria' && <Skillset
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
               />}
            </div>

            <nav className="mobile-menu">
              <a href="#" className="mobile-menu--menu-item" onClick={() => this.setState({area:'talent'})}>Talenten</a>
              <a href="#" className="mobile-menu--menu-item" onClick={() => this.setState({area:'culture'})}>Cultuur</a>
              <a href="#" className="mobile-menu--menu-item" onClick={() => this.setState({area:'motivations'})}>Drijfveren</a>
              <a href="#" className="mobile-menu--menu-item" onClick={() => this.setState({area:'criteria'})}>Criteria</a>
            </nav>

            
            {this.state.area != '' && 
              <VacancySearchButton 
                    searchCount={this.state.searchCount}
                    onSearchClick={this.performSearch}
                    isSticky={true}
                    css="mobile-search-button"
                    useIcon={true}></VacancySearchButton>
            }
          </div>
        </div>
        <div className="row d-sm-none search-bar">
          <div className="col">
            Kies je filter(s)
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
      </div>
    );
  }
}

export default Vacancies;