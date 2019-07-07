import axios from "axios";

class MailingService {
   baseUrl = process.env.API_URL + '/Mailing';

  addComingSoonRecipient = function(email) {
    console.log(email);

    return axios
      .post(this.baseUrl + "/ComingSoonMailing", {
        Email: email
      })
      .then(res => {
        return res.data;
      });
  };

  sendTellAFriendMail = function(message) {
    console.log(message);

    return axios
      .post(this.baseUrl + "/SendTellAFriendMail", message)
      .then(res => {
        return res.data;
      });
  };
}

export default MailingService;
