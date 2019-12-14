import React, { Component } from "react";

require("./header-image.scss");

class HeaderImage extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="row header-image">
                <div className="col-md-12 ">
                    <img src={this.props.image} className="img-fluid"/>
                </div>
            </div>
        );
    }
}

export default HeaderImage;