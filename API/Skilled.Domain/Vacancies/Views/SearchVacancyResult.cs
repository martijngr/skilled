using Skilled.Domain.DistanceCalculators;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Domain.Vacancies.Views
{
    public class SearchVacancyResult
    {
        public SearchVacancyResult(IQueryable<Vacancy> vacancies, IEnumerable<string> splittedTalents, IEnumerable<Distance> distances)
        {
            Vacancies = vacancies;
            SplittedTalents = splittedTalents;
            Distances = distances;
        }

        public IQueryable<Vacancy> Vacancies { get; }

        public IEnumerable<string> SplittedTalents { get; }

        public IEnumerable<Distance> Distances { get; }
    }
}