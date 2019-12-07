using Skilled.Business.Core;
using Skilled.Business.Core.DistanceCalculators;
using Skilled.Business.Frontend.Vacancies.Views;
using Skilled.Domain.Vacancies;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Business.Frontend.Vacancies.Searching
{
    public class VancancySearcher
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDistanceCalculator _distanceCalculator;

        private IEnumerable<Distance> _distances;

        public VancancySearcher(IUnitOfWork unitOfWork, IDistanceCalculator distanceCalculator)
        {
            _unitOfWork = unitOfWork;
            _distanceCalculator = distanceCalculator;

            _distances = Enumerable.Empty<Distance>();
        }

        public SearchVacancyResult Handle(SearchCriteria criteria)
        {
            var vacancies = _unitOfWork.Vacancies.All;

            var splittedTalents = Enumerable.Empty<string>();
            if (!string.IsNullOrEmpty(criteria.Talents))
                splittedTalents = criteria.Talents.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries).Select(t => t.Trim());

            vacancies = FilterByTalents(vacancies, criteria, splittedTalents);
            vacancies = FilterByWorkHoursPerWeek(vacancies, criteria);
            vacancies = FilterByThinkLevel(vacancies, criteria);
            vacancies = FilterByZipcodeDistance(vacancies, criteria);
            vacancies = FilterByMotivations(vacancies, criteria);
            vacancies = FilterByCultures(vacancies, criteria);

            return new SearchVacancyResult(vacancies.Distinct(), splittedTalents, _distances);
        }

        private IQueryable<Vacancy> FilterByZipcodeDistance(IQueryable<Vacancy> vacancies, SearchCriteria criteria)
        {
            if (string.IsNullOrEmpty(criteria.Zipcode) || criteria.TravelTime <= 0)
                return vacancies;

            var vacancyZipcodes = vacancies.Select(v => v.Zipcode.Value).ToList();
            _distances = _distanceCalculator.Calculate(criteria.Zipcode, vacancyZipcodes);
            var matchingZipcodes = _distances
                .Where(d => d.TravelDistanceInMinutes <= criteria.TravelTime)
                .Select(d => d.Zipcode.ToLower());

            var matchingVacancies = vacancies.Where(v => matchingZipcodes.Contains(v.Zipcode.Value.ToLower()));

            return matchingVacancies;
        }

        private IQueryable<Vacancy> FilterByThinkLevel(IQueryable<Vacancy> vacancies, SearchCriteria criteria)
        {
            if (criteria.ThinkLevel.HasValue)
                return vacancies.Where(v => v.ThinkLevel.Id == criteria.ThinkLevel.Value);

            return vacancies;
        }

        private IQueryable<Vacancy> FilterByWorkHoursPerWeek(IQueryable<Vacancy> vacancies, SearchCriteria criteria)
        {
            if (criteria.HoursPerWeek.HasValue)
                return vacancies.Where(v => v.HoursPerWeek == criteria.HoursPerWeek);

            return vacancies;
        }

        private IQueryable<Vacancy> FilterByTalents(IQueryable<Vacancy> vacancies, SearchCriteria criteria, IEnumerable<string> splittedTalents)
        {
            if (string.IsNullOrEmpty(criteria.Talents))
                return vacancies;
            else
            {
                var skills = _unitOfWork.Skills.All.Where(s => splittedTalents.Contains(s.Name));
                vacancies = skills.SelectMany(s => s.Vacancies).Distinct();
            }

            return vacancies;
        }

        private IQueryable<Vacancy> FilterByMotivations(IQueryable<Vacancy> vacancies, SearchCriteria criteria)
        {
            var motivationIds = criteria.MotivationIds.Where(m => m > 0);
            if (!motivationIds.Any())
                return vacancies;

            return vacancies.SelectMany(v =>
                v.Motivations
                    .Select(m => new { MotivationId = m.Id, Vacancy = v })
                    .Where(m => motivationIds.Contains(m.MotivationId))
                    .Select(m => m.Vacancy));
        }

        private IQueryable<Vacancy> FilterByCultures(IQueryable<Vacancy> vacancies, SearchCriteria criteria)
        {
            var cultureIds = criteria.CultureIds.Where(m => m > 0);
            if (!cultureIds.Any())
                return vacancies;

            return vacancies.SelectMany(v =>
                v.Employer.CompanyCultures
                    .Select(c => new { CompanyCultureId = c.Id, Vacancy = v })
                    .Where(m => cultureIds.Contains(m.CompanyCultureId))
                    .Select(m => m.Vacancy));
        }
    }
}
