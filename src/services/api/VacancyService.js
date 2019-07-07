import axios from "axios";

class VacancyService {
  baseUrl = process.env.API_URL + '/Vacancies';

  search = function(talents, hoursPerWeek, thinkLevel, zipcode, travelTime) {
    var talentNames = talents.map(t => t.Name);

    return axios
      .get(
        this.baseUrl + "/Search?talents=" +
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
        this.baseUrl + "/SearchCount?talents=" +
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
      .get(this.baseUrl + "/GetThinkLevels")
      .then(res => {
        return res.data;
      });
  };

  getById(vacancyId){
    return axios
      .get(this.baseUrl + "/GetVacancy?vacancyId=" + vacancyId)
      .then(res => {
        return res.data;
      });
  }
}

export default VacancyService;
