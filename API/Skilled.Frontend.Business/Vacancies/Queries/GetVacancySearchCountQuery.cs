using Skilled.Business.Frontend.Vacancies.Searching;
using Skilled.CQRS;
using System.Linq;

namespace Skilled.Business.Frontend.Vacancies.Queries
{
    public class GetVacancySearchCountQuery : SearchCriteria, IQuery<int>
    { }

    public class GetVacancySearchCountQueryHandler : IQueryHandler<GetVacancySearchCountQuery, int>
    {
        private readonly VancancySearcher _vacancySearcher;

        public GetVacancySearchCountQueryHandler(VancancySearcher vacancySearcher)
        {
            _vacancySearcher = vacancySearcher;
        }

        public int Handle(GetVacancySearchCountQuery query)
        {
            var searchResult = _vacancySearcher.Handle(query);

            return searchResult.Vacancies.Count();
        }
    }
}