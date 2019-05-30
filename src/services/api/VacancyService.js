import axios from "axios";

class VacancyService {
  baseUrl = process.env.API_URL + '/Vacancies';

  search = function(talents, hoursPerWeek, thinkLevel, zipcode, travelTime) {
    var talentNames = talents.map(t => t.Name);

    return axios
      .get(
        baseUrl + "/Search?talents=" +
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
        baseUrl + "/SearchCount?talents=" +
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
      .get(baseUrl + "/GetThinkLevels")
      .then(res => {
        return res.data;
      });
  };
}

export default VacancyService;
