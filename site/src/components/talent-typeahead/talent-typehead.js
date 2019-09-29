// https://github.com/ericgio/react-bootstrap-typeahead/blob/HEAD/docs/Usage.md

import { Typeahead } from "react-bootstrap-typeahead";
import React, { Component } from "react";
import TalentService from "./../../services/api/TalentService";

require("react-bootstrap-typeahead/css/Typeahead.css");

class TalentTypeahead extends Component {
  constructor(props) {
    super(props);

    this.talentService = new TalentService();

    this.onTalentSelected = this.onTalentSelected.bind(this);
  }

  state = {
    talents: []
  };

  componentDidMount() {
    this.talentService.search().then(res => {
      this.setState({
        talents: res.result
      });
    });
  }

  onTalentSelected(talent) {
    const instance = this._typeahead.getInstance()
    instance.clear()
    instance.focus()
    
    if (this.props.onTalentSelected && talent)
      this.props.onTalentSelected(talent);
  }

  render() {
    return (
      <Typeahead
        onChange={selected => {
          this.onTalentSelected(selected[0]);
        }}
        ref={(ref) => this._typeahead = ref}
        labelKey="Name"
        options={this.state.talents}
        placeholder={this.props.placeholderText}
        id="a1"
      />
    );
  }
}

export default TalentTypeahead;
