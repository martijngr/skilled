using Skilled.Business.Core.Skills.Queries;
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

        public VacancyDetailViewModel Build(int vacancyId, int[] talentIds)
        {
            var vacancy = _queryProcessor.Handle(new GetVacancyByIdQuery { VacancyId = vacancyId });

            var model = new VacancyDetailViewModel
            {
                Vacancy = vacancy,
                MatchPercentage = GetVacancyMatchPercentage(vacancy, talentIds),
            };

            return model;
        }

        private int GetVacancyMatchPercentage(VacancyView vacancy, int[] talentIds)
        {
            var vacancyTalents = vacancy.Skills;
            var candidateTalents = _queryProcessor.Handle(new GetTalentsByIdsQuery() { TalentIds = talentIds });
            var matchPercentage = _vacancyMatchCalculator.CalculateMatch(candidateTalents, vacancyTalents);

            return matchPercentage;
        }
    }
}
