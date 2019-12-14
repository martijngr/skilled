import React, { Component } from "react";
require("./vacancyBlock.scss");
import shareIcon from "../../assets/icons/Icon_delen.png";

class VacancyBlock extends Component {
  state = {};

  constructor(props){
    super(props);

    this.onVacancyClick = this.onVacancyClick.bind(this);
  }

  onVacancyClick(){
    if(this.props.onVacancyClick)
      this.props.onVacancyClick(this.props.vacancy);
  }

  render() {
    let progressbarStyle = {
      width: this.props.vacancy.MatchPercentage + "%"
    };

    return (
      <div className="results-block row" onClick={this.onVacancyClick}>
        <div className="results-block--matchperc col-sm-2">
          <div>{this.props.vacancy.MatchPercentage}%</div> 
          <div>match</div>
        </div>
        <div className="col-sm-10">
          <h5>
            {this.props.vacancy.Title}
          </h5>
          <div className="results-block--header-title-subtext">
            <span>{this.props.vacancy.CompanyName}</span>
            <span className="results-block--header-seperator" />
            <span>{this.props.vacancy.City}</span>
            <span className="results-block--header-seperator" />
            <span>{this.props.vacancy.ThinkLevel}</span>
          </div>
          <div className="results-block--description">
            {this.props.vacancy.Description}
          </div>
          <div className="result-block--footer">
            <div className="result-block--footer-icons">
              <span>
                 <img src={shareIcon} />
               </span>
             </div>
             <div className="result-block--footer-post-date">
               {this.props.vacancy.AgeInDays} dagen geleden
             </div>
           </div>
        </div>
      </div>
    );
  }
}

export default VacancyBlock;