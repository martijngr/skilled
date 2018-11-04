import React, { Component } from "react";
require("./skillset.scss");
// import SkillFinder from "../skillFinder/SkillFinder";
// import VacancyService from "./../../services/api/vacancy-service";
// import Modal from "react-modal";
import hourIcon from "../../assets/icons/Icon_aantal_uren.png";
import skillsetIcon from "../../assets/icons/Icon_skillset.png";
import thinkIcon from "../../assets/icons/Icon_skills.png";
//import TalentService from "./../../services/api/talent-service";

//Modal.setAppElement("#root");

class Skillset extends Component {
  constructor(props) {
    super(props);

    //this.vacancyService = new VacancyService();

    this.onTalentSelected = this.onTalentSelected.bind(this);
    this.onHoursPerWeekChange = this.onHoursPerWeekChange.bind(this);
    this.onThinkLevelChange = this.onThinkLevelChange.bind(this);
    this.onTravelTimeChange = this.onTravelTimeChange.bind(this);
    this.onZipcodeChange = this.onZipcodeChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.setSearchResultsTotal = this.setSearchResultsTotal.bind(this);
    this.maximumSelectedTalentsReached = this.maximumSelectedTalentsReached.bind(
      this
    );

    // Modal function handlers
    this.openTalentModal = this.openTalentModal.bind(this);
    this.afterOpenTalentModal = this.afterOpenTalentModal.bind(this);
    this.closeTalentModal = this.closeTalentModal.bind(this);
    this.setModalCheckboxes = this.setModalCheckboxes.bind(this);
    this.createTalentChecbox = this.createTalentChecbox.bind(this);
    this.onTalentModalCheckboxChange = this.onTalentModalCheckboxChange.bind(
      this
    );

    this.state = {
      thinkLevels: [],
      talentModalOpen: false,
      talents: [],
      hoursPerWeek: "",
      travelTime: "",
      zipcode: "",
      thinkLevel: "",
      searchCount: 0
    };
  }

  openTalentModal() {
    this.setState({ talentModalOpen: true });
  }

  afterOpenTalentModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeTalentModal() {
    this.setState({ talentModalOpen: false });
  }

  //   componentDidMount() {
  //     const that = this;
  //     this.vacancyService.getThinkeLevels().then(function(resp) {
  //       that.setState({
  //         thinkLevels: resp
  //       });
  //     });

  //     new TalentService().search().then(res => {
  //       const talents = res.result.map(t => ({ ...t, checked: false }));
  //       that.setState({ talents: talents });

  //       if (that.props && that.props.initialTalent.length > 0)
  //         that.onTalentSelected(that.props.initialTalent[0]);
  //     });
  //   }

  //   componentDidUpdate(prevProps, prevState, snapshot) {
  //     if (
  //       this.props.initialTalent &&
  //       this.props.initialTalent.length != prevProps.initialTalent.length
  //     ) {
  //       console.log("initialTalent.length differs");
  //       this.onTalentSelected(this.props.initialTalent[0]);
  //     }
  //   }

  onTalentSelected(talent) {
    if (this.maximumSelectedTalentsReached()) return;

    talent.checked = true;
    const talentIndex = this.state.talents.findIndex(t => t.Id == talent.Id);
    let talents = [...this.state.talents];
    talents[talentIndex] = talent;

    console.log("onTalentSelected", talents);

    this.setState({ talents }, this.setSearchResultsTotal);
  }

  onHoursPerWeekChange() {
    this.setState({
      hoursPerWeek: this.refs.hoursPerWeek.value
    });
  }

  onThinkLevelChange() {
    this.setState({
      thinkLevel: this.refs.thinkLevel.value
    });
  }

  onZipcodeChange() {
    this.setState({
      zipcode: this.refs.zipcode.value
    });
  }

  onTravelTimeChange() {
    this.setState({
      travelTime: this.refs.travelTime.value
    });
  }

  onSearchClick() {
    var searchPrefs = {
      talents: this.state.talents.filter(t => t.checked),
      hoursPerWeek: this.state.hoursPerWeek,
      travelTime: this.state.travelTime,
      zipcode: this.state.zipcode,
      thinkLevel: this.state.thinkLevel
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
    var talent = JSON.parse(e.target.dataset.talent);
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
        this.state.hoursPerWeek,
        this.state.thinkLevel,
        this.state.zipcode,
        this.state.travelTime
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
        <div className="skillset-header">skillset</div>
        <div className="skillset-content">
          {this.maximumSelectedTalentsReached() && (
            <div>
              Je hebt 5 talenten gekozen, haal een talent weg om een ander
              talent te kunnen kiezen
            </div>
          )}
          {this.state.talents.filter(t => t.checked).length < 5 && (
            <div className="skillset-form">
              {/* <SkillFinder onSearch={this.onTalentSelected} /> */}
              <div className="skillset-form--search-subtitle">
                <span onClick={this.openTalentModal}>
                  Of selecteer direct uit de talent store >
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
              {this.state.talents.filter(t => t.checked).map(t => (
                <div key={t.Id} className="skillset-selected-talents--talent">
                  <span
                    onClick={this.onTalentModalCheckboxChange}
                    data-talent={JSON.stringify(t)}
                    className="skillset-selected-talents--talent--remove"
                  >
                    X&nbsp;
                  </span>
                  {t.Name}
                </div>
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
                  onChange={this.onHoursPerWeekChange}
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
                  onChange={this.onTravelTimeChange}
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
                  onChange={this.onZipcodeChange}
                  onBlur={this.setSearchResultsTotal}
                  placeholder="1234AB"
                />
              </div>
              <div>
                <div className="skillset-criteria--overview-icon">
                  <img src={thinkIcon} />
                </div>
                mijn denkniveau is{" "}
                <select
                  ref="thinkLevel"
                  onBlur={this.setSearchResultsTotal}
                  onChange={this.onThinkLevelChange}
                >
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

        {/* <Modal
          isOpen={this.state.talentModalOpen}
          onAfterOpen={this.afterOpenTalentModal}
          onRequestClose={this.closeTalentModal}
          contentLabel="Talent store"
        >
          <h2>Talent store</h2>
          <button onClick={this.closeTalentModal}>close</button>
          {!this.maximumSelectedTalentsReached() && (
            <div>Kies uit de lijst maximaal vijf talenten</div>
          )}
          {this.maximumSelectedTalentsReached() && (
            <div>
              Je hebt 5 talenten gekozen, haal een talent weg om een ander
              talent te kunnen kiezen
            </div>
          )}
          <div>{this.setModalCheckboxes()}</div>
        </Modal> */}
      </div>
    );
  }
}

export default Skillset;
