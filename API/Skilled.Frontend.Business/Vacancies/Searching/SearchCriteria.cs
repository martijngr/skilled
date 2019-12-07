using System.Collections.Generic;
using System.Linq;

namespace Skilled.Business.Frontend.Vacancies.Searching
{
    public class SearchCriteria
    {
        public SearchCriteria()
        {
            MotivationIds = Enumerable.Empty<int>();
            CultureIds = Enumerable.Empty<int>();
        }

        public string Talents { get; set; }

        public int? HoursPerWeek { get; set; }

        public int? ThinkLevel { get; set; }

        public string Zipcode { get; set; }

        public int TravelTime { get; set; }

        public IEnumerable<int> MotivationIds { get; set; }

        public IEnumerable<int> CultureIds { get; set; }
    }
}