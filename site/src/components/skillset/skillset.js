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
    var that = this;
    var talents = that.state.talents.filter(t => t.checked);

    this.vacancyService
      .searchCount(
        talents,
        this.refs.hoursPerWeek.value,
        this.refs.thinkLevel.value,
        this.refs.zipcode.value,
        this.refs.travelTime.value
      )
      .then(resp => {
        that.setState({
          searchCount: resp.count
        });
      });
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
              <TalentTypeahead placeholderText="voeg een talent toe" onTalentSelected={this.onTalentSelected} />
              <div className="skillset-form--search-subtitle">
                <span onClick={this.openTalentModal}>
                  > Bekijk alle talenten
                </span>
              </div>
            </div>
          )}
          <div className="skillset-seperator" />
          <div className="skillset-selected-talents">
            <div className="skillset-selected-talents--header">
              Jouw talenten:
            </div>
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

                  // <div key={t.Id} className="skillset-selected-talents--talent">
                    
                  //   <span
                  //     onClick={this.onTalentModalCheckboxChange}
                  //     data-talent={JSON.stringify(t)}
                  //     className="skillset-selected-talents--talent--remove"
                  //   >
                  //     X&nbsp;
                  //   </span>
                  //   {t.Name}
                  // </div>
                ))}
            </div>
          </div>
          <div className="skillset-seperator" />
          <div className="skillset-criteria">
            <div className="skillset-criteria--header">Jouw voorkeuren:</div>
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
            <div
              className="skillset-search--button"
              onClick={this.onSearchClick}
            >
              Zoek ({this.state.searchCount})
            </div>
          </div>
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
