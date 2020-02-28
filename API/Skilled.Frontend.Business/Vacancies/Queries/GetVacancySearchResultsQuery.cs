using Skilled.Business.Frontend.Vacancies.Searching;
using Skilled.Business.Frontend.Vacancies.Views;
using Skilled.CQRS;
using Skilled.Domain.Settings;
using Skilled.Frontend.Business.Vacancies;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Business.Frontend.Vacancies.Queries
{
    public class GetVacancySearchResultsQuery : SearchCriteria, IQuery<IEnumerable<VacancySearchResult>>
    { }

    public class GetVacancySearchResultsQueryHandler : IQueryHandler<GetVacancySearchResultsQuery, IEnumerable<VacancySearchResult>>
    {
        private readonly VancancySearcher _vacancySearcher;
        private readonly IAppSettings _settings;
        private readonly VacancyMatchCalculator _vacancyMatchCalculator;

        public GetVacancySearchResultsQueryHandler(
            VancancySearcher vacancySearcher, 
            IAppSettings settings,
            VacancyMatchCalculator vacancyMatchCalculator)
        {
            _vacancySearcher = vacancySearcher;
            _settings = settings;
            _vacancyMatchCalculator = vacancyMatchCalculator;
        }

        public IEnumerable<VacancySearchResult> Handle(GetVacancySearchResultsQuery query)
        {
            var searchResult = _vacancySearcher.Handle(query);

            var view = searchResult.Vacancies.ToList().Select(v => new VacancySearchResult
            {
                Id = v.Id,
                City = v.City,
                Title = v.Title,
                VacancySkills = v.Skills.Select(s => s.Name),
                TravelTime = searchResult.Distances.FirstOrDefault(d => d.Zipcode == v.Zipcode.Value)?.TravelDistanceInMinutes,
                AgeInDays = (DateTime.Now - v.CreatedOn).Days,
                CompanyName = v.Employer.Name,
                Description = v.Description,
                ThinkLevel = v.ThinkLevel.Name
            }).ToList();

            CalculateMatchPercentages(searchResult.SplittedTalents, view);

            return view;
        }

        private void CalculateMatchPercentages(IEnumerable<string> splittedTalents, List<VacancySearchResult> searchResults)
        {
            var candidateTalentCount = splittedTalents?.Count() ?? 0;
            var candidateTalents = splittedTalents.Select(t => t.ToLower());

            foreach (var searchResult in searchResults)
            {
                var vacancyTalents = searchResult.VacancySkills.Select(t => t.ToLower());
                searchResult.MatchPercentage = _vacancyMatchCalculator.CalculateMatch(candidateTalents, vacancyTalents);
            }
        }
    }
}
