import axios from "axios";

class VacancyService {
  search = function(talents, hoursPerWeek, thinkLevel, zipcode, travelTime) {
    var talentNames = talents.map(t => t.Name);

    return axios
      .get(
        "http://localhost/Skilled/api/Vacancies/Search?talents=" +
          talentNames +
          "&HoursPerWeek=" +
          hoursPerWeek +
          "&ThinkLevel=" +
          thinkLevel +
          "&Zipcode=" +
          zipcode +
          "&TravelTime=" +
          travelTime
      )
      .then(res => {
        return res.data;
      });
  };

  searchCount = function(
    talents,
    hoursPerWeek,
    thinkLevel,
    zipcode,
    travelTime
  ) {
    var talentNames = talents.map(t => t.Name);

    return axios
      .get(
        "http://localhost/Skilled/api/Vacancies/SearchCount?talents=" +
          talentNames +
          "&HoursPerWeek=" +
          hoursPerWeek +
          "&ThinkLevel=" +
          thinkLevel +
          "&Zipcode=" +
          zipcode +
          "&TravelTime=" +
          travelTime
      )
      .then(res => {
        return res.data;
      });
  };

  getThinkeLevels = function() {
    return axios
      .get("http://localhost/Skilled/api/Vacancies/GetThinkLevels")
      .then(res => {
        return res.data;
      });
  };
}

export default VacancyService;
