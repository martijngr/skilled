import React, { Component } from "react";
import FormValidator from "../form-validator/FormValidator"
import ContactService from "../../services/api/ContactService";

class ContactForm extends Component {
    constructor(props){
        super(props);

        this.contactService = new ContactService();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.validator = new FormValidator([
            {
              field: "name",
              method: "isEmpty",
              validWhen: false,
              message:
                "Je bent je naam vergeten in te vullen"
            },
            {
              field: "email",
              method: "isEmail",
              validWhen: true,
              message: "Hmm dat lijkt niet op een e-mailadres..."
            },
            {
            field: "subject",
            method: "isEmpty",
            validWhen: false,
            message:
                "Oeps, je bent het onderwerp vergeten in te vullen"
            },
            {
            field: "message",
            method: "isEmpty",
            validWhen: false,
            message:
                "Vergeet je bericht niet!"
            },
          ]);

          this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            validation: this.validator.valid()
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    handleSubmit(event) {
        console.log('contact form state: ', this.state)
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if(validation.isValid){
            this.contactService.submitContactForm(this.state);
        }
        
        event.preventDefault();
    }

    render(){
        let validation = this.submitted // if the form has been submitted at least once
      ? this.validator.validate(this.state) // then check validity every time we render
      : this.state.validation; // otherwise just use what's in state

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Naam</label>
                        <input type="text" className="form-control" name="name" id="name" onChange={this.handleInputChange} value={this.state.name} placeholder="Naam"/>
                        <div className="validation">
                            <span className=" validation-error">
                                {validation.name.message}
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" id="email" onChange={this.handleInputChange} value={this.state.email} placeholder="E-mailadres"/>
                        <div className="validation">
                            <span className=" validation-error">
                                {validation.email.message}
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Onderwerp</label>
                        <input type="text" className="form-control" name="subject" id="subject" onChange={this.handleInputChange} value={this.state.subject}/>
                        <div className="validation">
                            <span className=" validation-error">
                                {validation.subject.message}
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Bericht</label>
                        <textarea id="message" className="form-control" name="message" onChange={this.handleInputChange} value={this.state.message}></textarea>
                        <div className="validation">
                            <span className=" validation-error">
                                {validation.message.message}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Verstuur bericht</button>
                </form>
            </div>
        );
    }

}

export default ContactForm;