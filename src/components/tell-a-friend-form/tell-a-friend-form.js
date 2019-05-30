import React, { Component } from "react";

import FormValidator from "../../components/form-validator/FormValidator";
import MailingService from "./../../services/api/MailingService";

class TellAFriendForm extends Component {
  mailingService = new MailingService();

  constructor(props) {
    super(props);

    this.submitTellAFriend = this.submitTellAFriend.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.validator = new FormValidator([
      {
        field: "from",
        method: "isEmpty",
        validWhen: false,
        message:
          "Wel zo leuk om te laten weten wie het bericht gestuurd heeft toch?"
      },
      {
        field: "to",
        method: "isEmail",
        validWhen: true,
        message: "Hmm dat lijkt niet op een e-mailadres..."
      }
    ]);

    this.submitted = false;

    this.state = {
      from: "",
      to: "foo@bar.com",
      message:
        "Hoi!\r\n \r\nBekijk dit eens, superleuk! Een vacaturesite waarbij je kan zoeken op je talenten. Misschien ook iets voor jou? \r\n \r\nGroetjes!",
      messageIsSend: false,
      validation: this.validator.valid()
    };
  }

  submitTellAFriend = function() {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      var that = this;

      this.mailingService
        .sendTellAFriendMail({
          from: this.state.from,
          to: this.state.to,
          message: this.state.message
        })
        .then(function() {
          that.setState({
            messageIsSend: true
          });
        });
    }
  };

  closeModal = function() {
    this.props.closeModal();
  };

  render() {
    let validation = this.submitted // if the form has been submitted at least once
      ? this.validator.validate(this.state) // then check validity every time we render
      : this.state.validation; // otherwise just use what's in state

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
              disabled={this.state.messageIsSend}
            />
            <div className="validation">
              <span className=" validation-error">
                {validation.from.message}
              </span>
            </div>
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
              disabled={this.state.messageIsSend}
            />
            <div className="validation">
              <span className=" validation-error">{validation.to.message}</span>
            </div>
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
              disabled={this.state.messageIsSend}
            />
          </div>
        </div>
        {this.state.messageIsSend && (
          <div className="offset-sm-4 col-sm-8">
            <span>Done! Er is een mail verstuurd naar {this.state.to}!</span>
            <br />
            <br />
          </div>
        )}
        <div className="form-group row">
          <div className="col-sm-12">
            {!this.state.messageIsSend && (
              <input
                type="button"
                value="Verstuur!"
                className="button-mail button-mail-friend float-right"
                onClick={this.submitTellAFriend}
              />
            )}
            {this.state.messageIsSend && (
              <input
                type="button"
                value="Sluit popup"
                className="button-mail button-mail-friend float-right"
                onClick={this.closeModal}
              />
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default TellAFriendForm;
