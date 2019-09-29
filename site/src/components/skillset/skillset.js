import React, { Component } from "react";
require("./skillset.scss");
import VacancyService from "./../../services/api/VacancyService";
import hourIcon from "../../assets/icons/Icon_aantal_uren.png";
import skillsetIcon from "../../assets/icons/Icon_skillset.png";
import thinkIcon from "../../assets/icons/Icon_skills.png";
import TalentService from "./../../services/api/TalentService";
import TalentTypeahead from "../../components/talent-typeahead/talent-typehead";
import TalentStore from "../talent-store/TalentStore";
import SelectedItem from "../selected-item/selected-item";
import VacancySearchButton from "../../components/vacancy-search-button/VacancySearchButton";

import conditionsImg from '../../assets/img/voorwaarden.png';
import motivationsImg from '../../assets/img/drijfveren.png';
import cultureImg from '../../assets/img/cultuur.png';
import linkedinImg from '../../assets/icons/linkedin_icon_black.png';
import instagramImg from '../../assets/icons/instagram_icon_black.png';

class Skillset extends Component {
  constructor(props) {
    super(props);

    this.vacancyService = new VacancyService();
    this.talentService = new TalentService();

    this.updateTalents = this.updateTalents.bind(this);

    this.onTalentSelected = this.onTalentSelected.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.setSearchResultsTotal = this.setSearchResultsTotal.bind(this);
    this.maximumSelectedTalentsReached = this.maximumSelectedTalentsReached.bind(
      this
    );

    // Modal function handlers
    this.openTalentModal = this.openTalentModal.bind(this);
    this.onTalentModalCheckboxChange = this.onTalentModalCheckboxChange.bind(
      this
    );

    // filter button click handlers
    this.motivationsClick = this.motivationsClick.bind(this);
    this.cultureClick = this.cultureClick.bind(this);

    this.state = {
      thinkLevels: [],
      talents: [],
      hoursPerWeek: "",
      travelTime: "",
      zipcode: "",
      thinkLevel: "",
      searchCount: 0
    };
  }

  motivationsClick(){
    if(this.props.onMotivationsClick)
      this.props.onMotivationsClick('motivations');
  }

  cultureClick(){
    if(this.props.onCultureClick)
      this.props.onCultureClick('culture');
  }

  openTalentModal() {
    this.refs.talentStoreModal.openTalentModal();
  }

  updateTalents(talents) {
    this.setState({
      talents: talents
    });
  }

  afterOpenTalentModal() {}

  componentDidMount() {
    const that = this;
    this.vacancyService.getThinkeLevels().then(function(resp) {
      that.setState({
        thinkLevels: resp
      });
    });

    this.talentService.search().then(res => {
      const talents = res.result.map(t => ({ ...t, checked: false }));
      that.setState({ talents: talents });

      if (that.props && that.props.initialTalent.length > 0)
        that.onTalentSelected(that.props.initialTalent[0]);
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.initialTalent &&
      this.props.initialTalent.length != prevProps.initialTalent.length
    ) {
      this.onTalentSelected(this.props.initialTalent[0]);
    }
  }

  onTalentSelected(talent) {
    if (this.maximumSelectedTalentsReached()) return;

    talent.checked = true;
    const talentIndex = this.state.talents.findIndex(t => t.Id == talent.Id);
    let talents = [...this.state.talents];
    talents[talentIndex] = talent;

    if(this.props.onTalentSelected)
        this.props.onTalentSelected(talent);

    this.setState({ talents }, this.setSearchResultsTotal);
  }

  onSearchClick() {
    var searchPrefs = {
      talents: this.state.talents.filter(t => t.checked),
      hoursPerWeek: this.refs.hoursPerWeek.value,
      travelTime: this.refs.travelTime.value,
      zipcode: this.refs.zipcode.value,
      thinkLevel: this.refs.thinkLevel.value
    };

    if (this.props.onSearchClick) this.props.onSearchClick(searchPrefs);
  }

  maximumSelectedTalentsReached() {
    return this.state.talents.filter(t => t.checked).length >= 5;
  }

  setModalCheckboxes() {
    return this.state.talents.map(this.createTalentChecbox);
  }

  createTalentChecbox(talent) {
    let attributes = {
      type: "checkbox",
      key: talent.Id,
      value: talent.Id,
      checked: talent.checked,
      onChange: this.onTalentModalCheckboxChange,
      "data-talent": JSON.stringify(talent)
    };

    return (
      <div key={talent.Id}>
        <label>
          <input {...attributes} /> {talent.Name}
        </label>
      </div>
    );
  }

  onTalentModalCheckboxChange(e) {
    var talent = JSON.parse(e.data);
    talent.checked = !talent.checked;

    if (this.maximumSelectedTalentsReached() && talent.checked) return;

    const talentIndex = this.state.talents.findIndex(t => t.Id == talent.Id);
    let updatedTalents = [...this.state.talents];
    updatedTalents[talentIndex] = talent;

    this.setState({ talents: updatedTalents }, this.setSearchResultsTotal);
  }

  setSearchResultsTotal() {
    if(this.props.setSearchResultsTotal)
      this.props.setSearchResultsTotal({
        hoursPerWeek: this.refs.hoursPerWeek.value,
        thinkLevel: this.refs.thinkLevel.value,
        zipcode: this.refs.zipcode.value,
        travelTime: this.refs.travelTime.value
      });

    // var that = this;
    // var talents = that.state.talents.filter(t => t.checked);

    // this.vacancyService
    //   .searchCount(
    //     talents,
    //     this.refs.hoursPerWeek.value,
    //     this.refs.thinkLevel.value,
    //     this.refs.zipcode.value,
    //     this.refs.travelTime.value
    //   )
    //   .then(resp => {
    //     that.setState({
    //       searchCount: resp.count
    //     });
    //   });
  }

  render() {
    return (
      <div className="skillset-container">
        <div className="skillset-header">
          <h4>Zoekfilters</h4>
        </div>
        <div className="skillset-content">
          {this.maximumSelectedTalentsReached() && (
            <div>
              Je hebt 5 talenten gekozen, haal een talent weg om een ander
              talent te kunnen kiezen
            </div>
          )}
          {this.state.talents.filter(t => t.checked).length < 5 && (
            <div className="skillset-form">
              <TalentTypeahead placeholderText="Voeg een talent toe" onTalentSelected={this.onTalentSelected} />
              <div className="skillset-form--search-subtitle">
                <span onClick={this.openTalentModal}>
                  > Bekijk alle talenten
                </span>
              </div>
            </div>
          )}
          <div className="skillset-seperator" />
          {/* <div className="skillset-selected-talents">
            <h6>Jouw talenten:</h6>
            <div className="skillset-selected-talents--overview">
              {this.state.talents
                .filter(t => t.checked)
                .map(t => (
                  <SelectedItem
                      onItemRemoved={this.onTalentModalCheckboxChange}
                      data={JSON.stringify(t)}
                      caption={t.Name}
                      key={t.Id}
                      />
                ))}
            </div>
          </div>
          <div className="skillset-seperator" /> */}
          
          <div className="skillset-filters">
              <h6>Filter ook op</h6>
              <div className="skillset-filters-icons">
                <div className="skillset-filters-button" onClick={this.motivationsClick}>
                  <img src={motivationsImg}/>
                  <div>Drijfveren</div>
                </div>
                <div className="skillset-filters-button" onClick={this.cultureClick}>
                  <img src={cultureImg}/>
                  <div>Cultuur</div>
                </div>
                <div>
                  <img src={conditionsImg}/>
                  <div>Voorwaarden</div>
                </div>
              </div>
          </div>
          
          <div className="skillset-seperator" />
          <div className="skillset-criteria">
            <h6>Aanvullende criteria</h6>
            <div className="skillset-criteria--overview">
              <div>
                <div className="skillset-criteria--overview-icon">
                  <img src={skillsetIcon} />
                </div>
                <input
                  type="text"
                  ref="hoursPerWeek"
                  onBlur={this.setSearchResultsTotal}
                  placeholder="32"
                  className="number"
                />{" "}
                werkuren per week
              </div>
              <div>
                <div className="skillset-criteria--overview-icon">
                  <img src={hourIcon} />
                </div>
                Maximaal{" "}
                <input
                  type="text"
                  ref="travelTime"
                  onBlur={this.setSearchResultsTotal}
                  placeholder="30"
                  className="number"
                />{" "}
                minuten reistijd
              </div>
              <div>
                <div className="skillset-criteria--overview-icon" />
                vanaf postcode{" "}
                <input
                  type="text"
                  ref="zipcode"
                  onBlur={this.setSearchResultsTotal}
                  placeholder="1234AB"
                  className="zipcode"
                />
              </div>
              <div>
                <div className="skillset-criteria--overview-icon">
                  <img src={thinkIcon} />
                </div>
                mijn denkniveau is{" "}
                <select ref="thinkLevel" onBlur={this.setSearchResultsTotal}>
                  {this.state.thinkLevels.map(t => (
                    <option key={t.Id} value={t.Id}>
                      {t.Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="skillset-seperator" />
          <div className="skillset-search">
          <VacancySearchButton 
                  searchCount={this.props.searchCount}
                  onSearchClick={this.props.onSearchClick}></VacancySearchButton>
          </div>
        </div>
        <div className="skillset-footer">
          <span className="skillset-footer-text">
            Need some courage first?
          </span>
          <span className="skillset-footer-social">
            <img src={linkedinImg}/> <img src={instagramImg}/>
          </span>
        </div>
        <TalentStore
          ref="talentStoreModal"
          talents={this.state.talents}
          isModelOpen={this.state.showTalentStore}
          updateTalents={this.updateTalents}
        />
      </div>
    );
  }
}

export default Skillset;
