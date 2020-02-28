using System.Collections.Generic;
using System.Linq;

namespace Skilled.Frontend.Business.Vacancies
{
    public class VacancyMatchCalculator
    {
        public int CalculateMatch(IEnumerable<string> candidatesTalents, IEnumerable<string> vacancyTalents)
        {
            var candidateTalentCount = candidatesTalents.Count();
            var vacancyTalentCount = vacancyTalents.Count();

            var candidateTalentsToLower = candidatesTalents.Select(t => t.ToLower());
            var vacancyTalentsToLower = vacancyTalents.Select(t => t.ToLower());

            var matchCount = candidateTalentsToLower.Intersect(candidateTalentsToLower).Count();

            if (matchCount == vacancyTalentCount)
            {
                return 100;
            }

            return 100 / vacancyTalentCount * matchCount;
        }
    }
}