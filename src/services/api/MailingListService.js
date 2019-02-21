import axios from "axios";

class MailingListService {
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
}

export default MailingListService;
