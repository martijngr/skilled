import React, { Component } from "react";
import Modal from "react-modal";
import MailingListService from "../../services/api/MailingListService";
import FormValidator from "../../components/form-validator/FormValidator";

require("./coming-soon.scss");

import instagramLogo from "../../../src/assets/icons/instagram_icon_black.png";
import linkedinLogo from "../../../src/assets/icons/linkedin_icon_black.png";

class ComingSoon extends Component {
  mailingListService = new MailingListService();

  constructor(props) {
    super(props);

    this.addComingSoonRecipient = this.addComingSoonRecipient.bind(this);
    this.onComingSoonRecipientChange = this.onComingSoonRecipientChange.bind(
      this
    );
    this.closeComingSoonModal = this.closeComingSoonModal.bind(this);
    this.openComingSoonModal = this.openComingSoonModal.bind(this);

    this.submitted = false;

    this.validator = new FormValidator([
      {
        field: "comingSoonRecipient",
        method: "isEmpty",
        validWhen: false,
        message: "Geen e-mailadres opgegeven :)"
      },
      {
        field: "comingSoonRecipient",
        method: "isEmail",
        validWhen: true,
        message: "Hmm dat lijkt niet op een e-mailadres..."
      }
    ]);

    this.state = {
      comingSoonRecipient: "",
      comingSoonModelOpen: true,
      validation: this.validator.valid(),
      processing: false
    };
  }

  onComingSoonRecipientChange = function(event) {
    this.setState({
      comingSoonRecipient: event.target.value,
      validation: this.validator.valid()
    });
  };

  addComingSoonRecipient = function() {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      var that = this;
      this.mailingListService
        .addComingSoonRecipient(this.state.comingSoonRecipient)
        .then(function() {
          that.openComingSoonModal();

          that.setState({
            comingSoonRecipient: ""
          });

          that.submitted = false;
        });
    }
  };

  closeComingSoonModal = function() {
    this.setState({ comingSoonModelOpen: false });
  };

  openComingSoonModal = function() {
    this.setState({ comingSoonModelOpen: true });
  };

  render() {
    let validation = this.submitted // if the form has been submitted at least once
      ? this.validator.validate(this.state) // then check validity every time we render
      : this.state.validation; // otherwise just use what's in state

    return (
      <React.Fragment>
        <div className="row cc--header-image">
          <div className="col-sm-12" />
        </div>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-5">
            <div className="block-highlight">
              <div className="block-highlight--video">
                <iframe
                  width="615"
                  height="315"
                  src="https://www.youtube.com/embed/P3Y8z6bwEVc"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="block-title">De vacaturesite</div>
              <div className="slogan">waarbij je zoekt op jouw talenten</div>
              <div className="block-highlight--advantages">
                <ul>
                  <li>
                    Vind vacatures nieuwe stijl: op talenten, reistijd en
                    denkniveau
                  </li>
                  <li>Maak gebruik van het ontwikkelde Skilled talentmodel</li>
                  <li>
                    Kandidaten zoeken kosteloos; werkgevers naar resultaat
                  </li>
                  <li>Absolute transparantie</li>
                </ul>
              </div>
              <div className="block-highlight--mail">
                <input
                  type="text"
                  placeholder="vul je e-mailadres in!"
                  className="mail-textbox"
                  value={this.state.comingSoonRecipient}
                  onChange={this.onComingSoonRecipientChange}
                />
                <input
                  type="button"
                  value="keep me posted"
                  className="button-mail button-mail-me"
                  onClick={this.addComingSoonRecipient}
                  disabled={this.state.processing}
                />
                <input
                  type="button"
                  value="and tell a friend"
                  className="button-mail button-mail-friend"
                  disabled={this.state.processing}
                />
              </div>
              <div className="validation">
                <span className=" validation-error">
                  {validation.comingSoonRecipient.message}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="block-title">Coming soon</div>
            <div className="content-text">
              <p>
                Wij bouwen Skilled. Wij geloven dat talenten het uitgangspunt
                moeten zijn van de zoektocht naar een baan die echt past. Want
                talent kun je niet aanleren, vaardigheden wel. Wij geloven dat
                als je werkt vanuit je talent het meer wordt dan een baan.{" "}
                <br />
                Stay tuned!
              </p>
            </div>
            <div className="slogan">
              See you soon, the Moonshot family{" "}
              <a href="http://www.google.com" target="_blank">
                <img className="img-25" src={instagramLogo} />
              </a>
            </div>
          </div>
          <div className="col-md-1" />
        </div>
        <div className="row">
          <div className="col-sm-12 footer">
            <div className="footer-contact">Contact</div>
            <div className="footer-email">e-mail@skilled.nu</div>
            <div className="footer-phone">06 - 28 494 618</div>
            <div className="social">
              <a href="http://www.google.com" target="_blank">
                <img className="img-25" src={instagramLogo} />
              </a>
              &nbsp;
              <a href="http://www.google.com" target="_blank">
                <img className="img-25" src={linkedinLogo} />
              </a>
            </div>
          </div>
        </div>

        <Modal
          size="sm"
          isOpen={this.state.comingSoonModelOpen}
          // style={customStyles}
          contentLabel="Example Modal"
          closeTimeoutMS={4000}
        >
          <div className="clearfix">
            <h2 className="float-left">Done!</h2>
            <div className="float-right">
              <button onClick={this.closeComingSoonModal}>X</button>
            </div>
          </div>
          <div>
            Tof dat je je hebt aangemeld. We gaan je op de hoogte houden van de
            ontwikkelingen van Skilled!
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ComingSoon;
