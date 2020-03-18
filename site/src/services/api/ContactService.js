import axios from "axios";

class ContactService {
    baseUrl = process.env.API_URL + '/Contact';

    submitContactForm = function(contactFormData){
        return axios.post(this.baseUrl + '/Submit', contactFormData).then(res =>{
            console.log('submitContactForm: ', res);
            return res;
        });
    };
}

export default ContactService;