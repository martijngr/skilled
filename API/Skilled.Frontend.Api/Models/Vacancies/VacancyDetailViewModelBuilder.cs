using Skilled.Business.Frontend.Vacancies.Queries;
using Skilled.Business.Frontend.Vacancies.Views;
using Skilled.CQRS;
using Skilled.Frontend.Business.Vacancies;

namespace Skilled.Frontend.Api.Models.Vacancies
{
    public class VacancyDetailViewModelBuilder
    {
        private readonly QueryProcessor _queryProcessor;
        private readonly VacancyMatchCalculator _vacancyMatchCalculator;

        public VacancyDetailViewModelBuilder(QueryProcessor queryProcessor, VacancyMatchCalculator vacancyMatchCalculator)
        {
            _queryProcessor = queryProcessor;
            _vacancyMatchCalculator = vacancyMatchCalculator;
        }

        public VacancyDetailViewModel Build(int vacancyId, string[] candidateTalents)
        {
            var vacancy = _queryProcessor.Handle(new GetVacancyByIdQuery { VacancyId = vacancyId });

            var model = new VacancyDetailViewModel
            {
                Vacancy = vacancy,
                MatchPercentage = GetVacancyMatchPercentage(vacancy, candidateTalents),
                CandidateTalents= candidateTalents
            };

            return model;
        }

        private int GetVacancyMatchPercentage(VacancyView vacancy, string[] candidateTalents)
        {
            var vacancyTalents = vacancy.Skills;
            var matchPercentage = _vacancyMatchCalculator.CalculateMatch(candidateTalents, vacancyTalents);

            return matchPercentage;
        }
    }
}
