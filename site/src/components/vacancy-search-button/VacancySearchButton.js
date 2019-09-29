import React, { Component } from "react";

require('./vacancy-search-button.scss');

class VacancySearchButton extends Component{
    constructor(props){
        super(props);

        this.onSearchClick = this.onSearchClick.bind(this);

        // state = {
        //     searchCount: 0,
        // };
    }

    onSearchClick() {
        // var searchPrefs = {
        //     talents: this.state.talents.filter(t => t.checked),
        //     hoursPerWeek: this.refs.hoursPerWeek.value,
        //     travelTime: this.refs.travelTime.value,
        //     zipcode: this.refs.zipcode.value,
        //     thinkLevel: this.refs.thinkLevel.value
        // };

        if (this.props.onSearchClick) 
            this.props.onSearchClick();
    }

    render(){
        return(
            // <div className="skillset-search">
            <span
              className="skillset-search--button"
              onClick={this.onSearchClick}
            >
              Zoek ({this.props.searchCount})
            </span>
        //   </div>
        );
    }
}

export default VacancySearchButton;