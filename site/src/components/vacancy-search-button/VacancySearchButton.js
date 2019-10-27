import React, { Component } from "react";

require('./vacancy-search-button.scss');

class VacancySearchButton extends Component{
    constructor(props){
        super(props);

        this.onSearchClick = this.onSearchClick.bind(this);
    }

    onSearchClick() {
        if (this.props.onSearchClick) 
            this.props.onSearchClick();
    }

    render(){
        let cssClass = "skillset-search--button";
        cssClass = this.props.isSticky ? cssClass + " sticky-to-corner" : cssClass;
        return(
            <span
              className={cssClass}
              onClick={this.onSearchClick}
            >
              Zoek ({this.props.searchCount})
            </span>
        );
    }
}

export default VacancySearchButton;