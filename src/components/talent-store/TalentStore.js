import React, { Component } from "react";
import TalentService from "./../../services/api/TalentService";
import Modal from "react-modal";
import VacancyService from "./../../services/api/VacancyService";

Modal.setAppElement("#app");

class TalentStore extends Component {
  constructor(props) {
    super(props);

    this.closeTalentModal = this.closeTalentModal.bind(this);
    this.onTalentModalCheckboxChange = this.onTalentModalCheckboxChange.bind(
      this
    );

    this.talentService = new TalentService();
    this.vacancyService = new VacancyService();

    this.state = {
      talents: props.talents,
      isModelOpen: false
    };
  }

  componentDidMount() {
    // this.talentService.search().then(resp => {
    //   this.setState({
    //     talents: resp.result
    //   });
    // });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.talents != prevProps.talents)
      this.setState({
        talents: this.props.talents
      });
  }

  openTalentModal() {
    this.setState({ isModelOpen: true });
  }

  closeTalentModal() {
    this.setState({ isModelOpen: false });
  }

  maximumSelectedTalentsReached() {
    return this.state.talents.filter(t => t.checked).length >= 5;
  }

  setModalCheckboxes() {
    return this.state.talents.map(talent => {
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
    });
  }

  //   createTalentCheckbox(talent) {
  //     let attributes = {
  //       type: "checkbox",
  //       key: talent.Id,
  //       value: talent.Id,
  //       checked: talent.checked,
  //       onChange: this.onTalentModalCheckboxChange,
  //       "data-talent": JSON.stringify(talent)
  //     };

  //     return (
  //       <div key={talent.Id}>
  //         <label>
  //           <input {...attributes} /> {talent.Name}
  //         </label>
  //       </div>
  //     );
  //   }

  onTalentModalCheckboxChange(e) {
    var talent = JSON.parse(e.target.dataset.talent);
    talent.checked = !talent.checked;

    if (this.maximumSelectedTalentsReached() && talent.checked) return;

    const talentIndex = this.state.talents.findIndex(t => t.Id == talent.Id);
    let updatedTalents = [...this.state.talents];
    updatedTalents[talentIndex] = talent;

    this.setState({ talents: updatedTalents });

    if (this.props.updateTalents) this.props.updateTalents(updatedTalents);
  }

  render() {
    return (
      <Modal
        isOpen={this.state.isModelOpen}
        //   onAfterOpen={this.afterOpenTalentModal}
        //   onRequestClose={this.closeTalentModal}
        contentLabel="Talent store"
      >
        <h2>Talent store</h2>
        <button onClick={this.closeTalentModal}>close</button>
        {!this.maximumSelectedTalentsReached() && (
          <div>Kies uit de lijst maximaal vijf talenten</div>
        )}
        {this.maximumSelectedTalentsReached() && (
          <div>
            Je hebt 5 talenten gekozen, haal een talent weg om een ander talent
            te kunnen kiezen
          </div>
        )}
        <div>{this.setModalCheckboxes()}</div>
      </Modal>
    );
  }
}

export default TalentStore;
