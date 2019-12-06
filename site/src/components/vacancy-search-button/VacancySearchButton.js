import React, { Component } from "react";
import magnifier from "../../assets/icons/icon_zoeken_optie_2_gespiegeld.png";

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
        let cssClass = "search ";
        cssClass += this.props.css;
        cssClass = this.props.isSticky ? cssClass + " sticky-to-corner" : cssClass;
        cssClass = this.props.useIcon ? cssClass + " search--icon" : cssClass + " search--button";

        return(
            <span
              className={cssClass}
              onClick={this.onSearchClick}
            >
                {this.props.useIcon && <img src={magnifier} className="search--icon-img"/>}
                {!this.props.useIcon && <span>Zoek ({this.props.searchCount})</span>} 
            </span>
        );
    }
}

export default VacancySearchButton;