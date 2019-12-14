import React, { Component } from "react";
import VacancyBlock from "../vacancy-block/VacancyBlock";

require("./vacancyResults.scss");

class VacancyResults extends Component {
  constructor(props) {
    super(props);

    this.onVacancyClick = this.onVacancyClick.bind(this);
  }

  state = {
  };

  onVacancyClick(vacancy){
    if(!vacancy) 
      return;

    if(this.props.onVacancyClick){
      this.props.onVacancyClick(vacancy);
    }

  }

  render() {
    return (
        <React.Fragment>
            {this.props.results.map(v => (
              <React.Fragment key={v.Id+"vr"}>
                  <div className="row" key={v.Id+5000}>
                  <div className="result-separator"></div>
                  </div>

                  <VacancyBlock key={v.Id} vacancy={v} onVacancyClick={this.onVacancyClick}/>
              </React.Fragment>
            ))}
        </React.Fragment>
    );
  }
}

export default VacancyResults;