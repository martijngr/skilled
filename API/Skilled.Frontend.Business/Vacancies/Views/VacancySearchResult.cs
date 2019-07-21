using System.Collections.Generic;

namespace Skilled.Business.Frontend.Vacancies.Views
{
    public class VacancySearchResult
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string City { get; set; }

        public IEnumerable<string> VacancySkills { get; set; }

        public int MatchPercentage { get; set; }

        public int? TravelTime { get; set; }

        public string LogoUrl { get; set; }

        public string CompanyName { get; set; }

        public string ThinkLevel { get; set; }

        public string Description { get; set; }

        public int AgeInDays { get; set; }
    }
}