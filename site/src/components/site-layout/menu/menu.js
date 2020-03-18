import React, { Component } from "react";
import skilledLogo from '../../../assets/img/skilled_logo.png';
import Modal from "react-modal";
import ContactForm from "../../contact-form/ContactForm"

require("./menu.scss");

class Menu extends Component {
  constructor(props){
    super(props);

    this.showContactModal = this.showContactModal.bind(this);
    this.closeContactModal = this.closeContactModal.bind(this);
    
    Modal.setAppElement('#app');
  }

  state = {
    isContactModelOpen: false
  };

  showContactModal(){
    this.setState({
      isContactModelOpen: true
    });
  }

  closeContactModal(){
    this.setState({
      isContactModelOpen: false
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand header--top-logo" href="/">
              <img src={skilledLogo}/>
              SKILLED
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <div className="header--top-slogan">happy money making</div>
              <ul className="navbar-nav ml-auto top-right-menu">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    How it works
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.showContactModal}>
                    Contact
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link" href="#">
                    Ik ben werkgever
                  </a>
                </li> */}
              </ul>
            </div>
          </nav>
        </div>

        <Modal 
          isOpen={this.state.isContactModelOpen}
          onRequestClose={this.closeContactModal}
          >
            <ContactForm/>
        </Modal>
      </div>
    );
  }
}

export default Menu;
