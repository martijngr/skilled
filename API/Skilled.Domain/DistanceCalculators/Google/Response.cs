using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.Domain.DistanceCalculators.Google
{
    public class Response
    {
        public List<string> destination_addresses { get; set; }
        public List<string> origin_addresses { get; set; }
        public List<Row> rows { get; set; }
        public string status { get; set; }

        public IEnumerable<int> GetDurations()
        {
            if (!rows.Any())
                return Enumerable.Empty<int>();

            return rows.SelectMany(r => r.elements).Select(r => r.duration.value);
        }
    }

    public class DistanceResponse
    {
        public string text { get; set; }
        public int value { get; set; }
    }

    public class Duration
    {
        public string text { get; set; }
        public int value { get; set; }
    }

    public class Element
    {
        public DistanceResponse distance { get; set; }
        public Duration duration { get; set; }
        public string status { get; set; }
    }

    public class Row
    {
        public List<Element> elements { get; set; }
    }
}
