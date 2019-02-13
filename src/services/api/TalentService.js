import axios from "axios";

class TalentService {
  search = function(keyword) {
    keyword = keyword || "";
    return axios
      .get("http://localhost/Skilled/api/Talent/Search?keyword=" + keyword)
      .then(res => {
        return res.data;
      });
  };
}

export default TalentService;
