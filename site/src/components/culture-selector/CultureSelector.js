import React, { Component } from "react";
import CultureCard from "./CultureCard";

require("./culture-selector.scss");

class CultureSelector extends Component{
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(culture){
        if(this.props.onCultureClick)
            this.props.onCultureClick(culture);
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12 cultures-container">
                {this.props.cultures.map(m => (
                        <CultureCard key={m.id} onClick={this.onClick} culture={m}></CultureCard>
                    ))}
                </div>
            </div>
        );
    }
}

export default CultureSelector;