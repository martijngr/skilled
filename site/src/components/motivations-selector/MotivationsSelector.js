import React, { Component } from "react";
import MotivationCard from "./MotivationCard";

require("./motivations-selector.scss");

class MotivationsSelector extends Component{
    constructor(props) {
        super(props);
    
        this.onClick = this.onClick.bind(this);
    }


    onClick(motivation){
        if(this.props.onMotivationClick)
            this.props.onMotivationClick(motivation);
    }

    render(){
        
        return(
            <div className="row">
                <div className="col-md-12 motivatons-container">
                    {this.props.motivations.map(m => (
                        <MotivationCard key={m.Id} onClick={this.onClick} motivation={m}></MotivationCard>
                    ))}
                </div>
            </div>
        );
    }
}

export default MotivationsSelector;