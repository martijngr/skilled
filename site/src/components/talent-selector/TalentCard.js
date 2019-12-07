import React, { Component } from "react";

require("./talent-card.scss");

class TalentCard extends Component{
    constructor(props) {
        super(props);
    
        this.onClick = this.onClick.bind(this);

        this.state = {
            talent: this.props.talent
        };
    }

    onClick(){
        if(this.props.onClick){
            this.props.onClick(this.props.talent);
        }
    }

    render(){
        const cardCss = this.props.talent.checked ? 'card card--selected' : 'card';
        return(
            <div className={cardCss} onClick={this.onClick}>
                <div className="card-body">
                    <p className="card-text">
                        {this.props.talent.Name}
                    </p>
                </div>
            </div>
        );
    }
}

export default TalentCard;