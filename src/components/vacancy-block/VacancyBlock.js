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
      this.props.onVacancyClick(this.props.vacancy.Id);
  }

  render() {
    let progressbarStyle = {
      width: this.props.vacancy.MatchPercentage + "%"
    };

    return (
      <div className="results-block" onClick={this.onVacancyClick}>
        <div className="results-block--header">
          <div className="results-block--header-logo">
            <img
              src={
                "http://localhost/Skilled/api/Vacancies/Logo?vacancyId=" +
                this.props.vacancy.Id
              }
            />
          </div>
          <div className="results-block--header-title">
            <div className="results-block--header-title-text">
              {this.props.vacancy.Title}
            </div>
            <div className="results-block--header-title-subtext">
              <span>{this.props.vacancy.CompanyName}</span>
              <span className="results-block--header-seperator" />
              <span>{this.props.vacancy.City}</span>
              <span className="results-block--header-seperator" />
              <span>{this.props.vacancy.ThinkLevel}</span>
            </div>
          </div>
          <div className="results-block--description">
            {this.props.vacancy.Description}
          </div>
          <div className="result-block--talents">
            {this.props.vacancy.VacancySkills.map(t => (
              <div className="result-block--talents-tag" key={t}>
                {t}
              </div>
            ))}
          </div>
          <div className="result-block--matchbar progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={progressbarStyle}
              aria-valuenow={this.props.vacancy.MatchPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
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