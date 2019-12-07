import React, { Component } from "react";

require("./motivation-card.scss");

class MotivationCard extends Component{
    constructor(props) {
        super(props);
    
        this.onClick = this.onClick.bind(this);

        this.state = {
            motivation: this.props.motivation
        };
    }

    onClick(){
        var motivation = this.state.motivation;
        motivation.checked = !this.state.motivation.checked;
        this.setState({
            motivation: motivation
        });

        if(motivation.checked && this.props.onClick){
            motivation.checked = true;
            this.props.onClick(motivation);
        }

        if(!motivation.checked && this.props.onClick){
            motivation.checked = false;
            this.props.onClick(motivation);
        }
    }

    render(){
        const cardCss = this.state.motivation.checked ? 'card card--selected' : 'card';
        return(
            <div className={cardCss} onClick={this.onClick}>
                <img src="https://i0.wp.com/www.oxbridgeacademy.edu.za/blog/wp-content/uploads/2015/09/Motivation-sign-with-a-beautiful-day.jpeg?fit=960%2C593&ssl=1" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <p className="card-text">
                        {this.props.motivation.Name}
                    </p>
                </div>
            </div>
        );
    }
}

export default MotivationCard;