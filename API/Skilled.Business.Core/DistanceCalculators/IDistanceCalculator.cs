using System.Collections.Generic;

namespace Skilled.Business.Core.DistanceCalculators
{
    public interface IDistanceCalculator
    {
        IEnumerable<Distance> Calculate(string fromZipcode, IEnumerable<string> toZipcodes);
    }
}
