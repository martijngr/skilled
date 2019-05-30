import axios from "axios";

class TalentService {
  baseUrl = process.env.API_URL + '/Talent';

  search = function(keyword) {
    keyword = keyword || "";
    return axios
      .get(baseUrl + "/Search?keyword=" + keyword)
      .then(res => {
        return res.data;
      });
  };
}

export default TalentService;
