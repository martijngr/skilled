import axios from "axios";

class VacancyService {
  baseUrl = process.env.API_URL + '/Vacancies';

  search = function(
    talents, 
    hoursPerWeek, 
    thinkLevel, 
    zipcode, 
    travelTime, 
    motivationIds, 
    cultureIds ) {
    var talentNames = talents.map(t => t.Name);

    let cultureIdList = cultureIds.map(c =>  c.Id + '&CultureIds=').join("");
    let motivationIdList = motivationIds.map(c =>  c.Id + '&MotivationIds=').join("");

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
          travelTime +
          "&MotivationIds=" +
          motivationIdList +
          "&CultureIds=" + 
          cultureIdList
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
    travelTime,
    motivationIds,
    cultureIds
  ) {
    var talentNames = talents.map(t => t.Name);
    let cultureIdList = cultureIds.map(c =>  c.Id + '&CultureIds=').join("");
    let motivationIdList = motivationIds.map(c =>  c.Id + '&MotivationIds=').join("");

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
          travelTime +
          "&MotivationIds=" +
          motivationIdList +
          "&CultureIds=" + 
          cultureIdList
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

  getMotivations = function() {
    return axios
      .get(this.baseUrl + "/GetMotivations")
      .then(res => {
        return res.data;
      });
  };

  getCompanyCultures = function() {
    return axios
      .get(this.baseUrl + "/GetCompanyCultures")
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
