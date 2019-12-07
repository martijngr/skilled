import React, { Component } from "react";

require("./selected-item.scss");

class SelectedItem extends Component {
  constructor(props) {
    super(props);

    this.onItemRemoved = this.onItemRemoved.bind(this);
  }

  state = {
    
  };

  onItemRemoved() {
      var item= {
          id: this.props.id, 
          title: this.props.caption,
          data: this.props.data
        };
    if (this.props.onItemRemoved && item)
      this.props.onItemRemoved(item);
  }

  render() {
    return (
      <span className="selected-item">
        {this.props.onItemRemoved && <span onClick={this.onItemRemoved} className="selected-item-close">X </span>}
        {this.props.caption}
      </span>
    );
  }
}

export default SelectedItem;