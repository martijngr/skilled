import React, { Component } from "react";
import TalentCard from "./TalentCard";

require("./talent-selector.scss");

class TalentSelector extends Component{
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.isMaxSelectionCountReached = this.isMaxSelectionCountReached.bind(this);
        this.getCheckedTalents = this.getCheckedTalents.bind(this);

        this.state = {
            talents: this.props.talents
        };
    }

    onClick(talent){
        talent.checked = !talent.checked;
        
        if(this.props.onTalentClick){
            this.props.onTalentClick(talent);
        }

    }

    isMaxSelectionCountReached(){
        if(!this.props.maxCheckCount)
            return false;

        return this.getCheckedTalents().length >= this.props.maxCheckCount;
    }

    getCheckedTalents(){
        return this.state.talents.filter(t => t.checked);
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12 talents-container">
                {!this.isMaxSelectionCountReached() && this.state.talents.map(t => (
                        <TalentCard 
                            key={t.Id} 
                            onClick={this.onClick} 
                            talent={t}></TalentCard>
                    ))}
                {this.isMaxSelectionCountReached() && this.getCheckedTalents().map(t => (
                        <TalentCard 
                            key={t.Id} 
                            onClick={this.onClick} 
                            talent={t}></TalentCard>
                    ))}
                </div>
            </div>
        );
    }
}

export default TalentSelector;