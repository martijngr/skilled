import axios from "axios";

class MailingService {
  addComingSoonRecipient = function(email) {
    console.log(email);

    return axios
      .post("http://localhost/Skilled/api/Mailing/ComingSoonMailing", {
        Email: email
      })
      .then(res => {
        return res.data;
      });
  };

  sendTellAFriendMail = function(message) {
    console.log(message);

    return axios
      .post("http://localhost/Skilled/api/Mailing/SendTellAFriendMail", message)
      .then(res => {
        return res.data;
      });
  };
}

export default MailingService;
