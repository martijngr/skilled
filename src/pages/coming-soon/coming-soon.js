import React, { Component } from "react";
import Modal from "react-modal";
import MailingService from "../../services/api/MailingService";
import FormValidator from "../../components/form-validator/FormValidator";
import TellAFriendForm from "../../components/tell-a-friend-form/tell-a-friend-form";
import { Tooltip } from "react-tippy";
import { WhatsappShareButton, WhatsappIcon, EmailIcon } from "react-share";

require("./coming-soon.scss");
import "react-tippy/dist/tippy.css";

import instagramLogo from "../../../src/assets/icons/instagram_icon_black.png";
import linkedinLogo from "../../../src/assets/icons/linkedin_icon_black.png";

/* 
RESOURCES

Tippy: https://tvkhoa.github.io/testlib/
social share: https://www.npmjs.com/package/react-share
*/
class ComingSoon extends Component {
  mailingListService = new MailingService();

  constructor(props) {
    super(props);

    this.addComingSoonRecipient = this.addComingSoonRecipient.bind(this);
    this.onComingSoonRecipientChange = this.onComingSoonRecipientChange.bind(
      this
    );
    this.closeComingSoonModal = this.closeComingSoonModal.bind(this);
    this.openComingSoonModal = this.openComingSoonModal.bind(this);
    this.closeTellAFriendModal = this.closeTellAFriendModal.bind(this);
    this.openTellAFriendModal = this.openTellAFriendModal.bind(this);
    this.showTellAFriendTippy = this.showTellAFriendTippy.bind(this);
    this.closeTellAFriendTippy = this.closeTellAFriendTippy.bind(this);

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
      comingSoonModelOpen: false,
      tellAFriendModelOpen: false,
      validation: this.validator.valid(),
      processing: false,
      tellAFriend: {
        from: "",
        to: "",
        message:
          "Hoi!\r\n \r\nBekijk dit eens, superleuk! Een vacaturesite waarbij je kan zoeken op je talenten. Misschien ook iets voor jou? \r\n \r\n Groetjes!"
      },
      showTellAFriendTippy: false
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

  closeTellAFriendModal = function() {
    this.setState({ tellAFriendModelOpen: false });
  };

  openTellAFriendModal = function() {
    this.setState({ tellAFriendModelOpen: true });
  };

  showTellAFriendTippy = function() {
    this.setState({
      showTellAFriendTippy: true
    });
  };

  closeTellAFriendTippy = function() {
    this.setState({
      showTellAFriendTippy: false
    });
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
                {/* <input
                  type="button"
                  value="and tell a friend"
                  className="button-mail button-mail-friend"
                  onClick={this.openTellAFriendModal}
                  disabled={this.state.processing}
                /> */}
                <Tooltip
                  // trigger="click"
                  interactive
                  arrow={true}
                  theme="light"
                  open={this.state.showTellAFriendTippy}
                  onRequestClose={this.closeTellAFriendTippy}
                  html={
                    <div className="social-share--container">
                      <div className="social-share--button">
                        <WhatsappShareButton
                          title="Share Skilled!"
                          url="http://www.skilled.nu"
                        >
                          <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>
                      </div>
                      <div
                        className="social-share--button"
                        onClick={() => {
                          this.openTellAFriendModal();
                          this.closeTellAFriendTippy();
                        }}
                      >
                        <EmailIcon size={32} round={true} />
                      </div>
                    </div>
                  }
                >
                  <input
                    type="button"
                    value="and tell a friend"
                    className="button-mail button-mail-friend"
                    onClick={this.showTellAFriendTippy}
                    disabled={this.state.processing}
                  />
                </Tooltip>
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
          isOpen={this.state.comingSoonModelOpen}
          // style={customStyles}
          contentLabel="Example Modal"
          closeTimeoutMS={500}
        >
          <div className="childDiv">
            <div
              className="close-button close-button--circle close-button--top-right"
              onClick={this.closeComingSoonModal}
            >
              <span>X</span>
            </div>
            <div className="clearfix">
              <h2 className="float-left">Done!</h2>
            </div>
            <br />
            <div>
              Tof dat je je hebt aangemeld. We gaan je op de hoogte houden van
              de ontwikkelingen van Skilled!
            </div>
            <br />
            <br />
            <div>
              <div
                className="close-button close-button--rectangle"
                onClick={this.closeComingSoonModal}
              >
                <span>Sluit popup</span>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={this.state.tellAFriendModelOpen}
          contentLabel="Example Modal"
          closeTimeoutMS={500}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeTellAFriendModal}
        >
          <div className="childDiv">
            <div
              className="close-button close-button--circle close-button--top-right"
              onClick={this.closeTellAFriendModal}
            >
              <span>X</span>
            </div>
            <div className="clearfix">
              <h2 className="float-left">Tell a Friend!</h2>
            </div>
            <br />
            <div>
              <TellAFriendForm closeModal={this.closeTellAFriendModal} />
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ComingSoon;
