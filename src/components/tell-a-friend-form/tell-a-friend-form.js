import React, { Component } from "react";

import FormValidator from "../../components/form-validator/FormValidator";

class TellAFriendForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: "",
      to: "",
      message:
        "Hoi!\r\n \r\nBekijk dit eens, superleuk! Een vacaturesite waarbij je kan zoeken op je talenten. Misschien ook iets voor jou? \r\n \r\n Groetjes!"
    };
  }

  render() {
    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Jouw naam</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="Jouw naam"
              value={this.state.from}
              onChange={e => this.setState({ from: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">
            E-mailadres vriend(in)
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="E-mailadres vriend(in)"
              value={this.state.to}
              onChange={e => this.setState({ to: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Bericht</label>
          <div className="col-sm-8">
            <textarea
              className="form-control"
              rows="6"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            <input
              type="button"
              value="Verstuur!"
              className="button-mail button-mail-friend float-right"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default TellAFriendForm;
