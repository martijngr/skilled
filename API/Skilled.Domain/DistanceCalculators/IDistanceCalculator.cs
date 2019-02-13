using System.Collections.Generic;

namespace Skilled.Domain.DistanceCalculators
{
    public interface IDistanceCalculator
    {
        IEnumerable<Distance> Calculate(string fromZipcode, IEnumerable<string> toZipcodes);
    }
}
