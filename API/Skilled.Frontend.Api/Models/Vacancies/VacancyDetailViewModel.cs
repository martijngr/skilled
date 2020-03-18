using Skilled.Business.Frontend.Vacancies.Views;

namespace Skilled.Frontend.Api.Models.Vacancies
{
    public class VacancyDetailViewModel
    {
        public VacancyView Vacancy { get; set; }

        public int MatchPercentage { get; set; }

        public string[] CandidateTalents { get; set; }
    }
}