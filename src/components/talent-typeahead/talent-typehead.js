import { Typeahead } from "react-bootstrap-typeahead";
import React, { Component } from "react";

require("react-bootstrap-typeahead/css/Typeahead.css");

class TalentTypeahead extends Component {
  render() {
    return (
      <Typeahead
        onChange={selected => {
          console.log(selected);
        }}
        options={["foo", "bar", "barfoo", "foobar", "fanta"]}
      />
    );
  }
}

export default TalentTypeahead;
