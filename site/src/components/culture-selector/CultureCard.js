import React, { Component } from "react";

require("./culture-card.scss");

class CultureCard extends Component{
    constructor(props) {
    super(props);
    
        this.onClick = this.onClick.bind(this);

        this.state = {
            culture: this.props.culture
        };
    }

    onClick(){
        var culture = this.state.culture;
        culture.checked = !this.state.culture.checked;

        this.setState({
            culture: culture
        });

        if(this.props.onClick){
            this.props.onClick(culture);
        }
    }

    render(){
        const cardCss = this.state.culture.checked ? 'card card--selected' : 'card';
        return(
            <div className={cardCss} onClick={this.onClick}>
                <img src="https://publicsoperarouen.files.wordpress.com/2015/11/8211388838_84682b08c5_b.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <p className="card-text">
                        {this.props.culture.Name}
                    </p>
                </div>
            </div>
        );
    }
}

export default CultureCard;