import React, { Component } from "react";

require("./coming-soon.scss");
import instagramLogo from "../../../src/assets/icons/instagram_icon_black.png";
import linkedinLogo from "../../../src/assets/icons/linkedin_icon_black.png";

class ComingSoon extends Component {
  render() {
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
                  ref="email"
                  placeholder="vul je e-mailadres in!"
                  className="mail-textbox"
                />
                <input
                  type="button"
                  value="keep me posted"
                  className="button-mail button-mail-me"
                />
                <input
                  type="button"
                  value="and tell a friend"
                  className="button-mail button-mail-friend"
                />
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
      </React.Fragment>
    );
  }
}

export default ComingSoon;
