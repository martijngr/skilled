using Skilled.Domain.Zipcodes;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Domain.DistanceCalculators
{
    public class DbDistanceCalculatorDecorator : IDistanceCalculator
    {
        private readonly IDistanceCalculator _distanceCalculator;
        private readonly IUnitOfWork _unitOfWork;

        public DbDistanceCalculatorDecorator(IDistanceCalculator distanceCalculator, IUnitOfWork unitOfWork)
        {
            _distanceCalculator = distanceCalculator;
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<Distance> Calculate(string fromZipcode, IEnumerable<string> toZipcodes)
        {
            var notFoundDistances = new List<string>();
            var foundDistances = new List<Distance>();

            foreach (var toZipcode in toZipcodes)
            {
                var zipcodeDistance = _unitOfWork.ZipcodeDistances
                    .All
                    .FirstOrDefault(z => z.FromZipcode.Value == fromZipcode && z.ToZipcode.Value == toZipcode);

                if (zipcodeDistance == null)
                {
                    notFoundDistances.Add(toZipcode);
                }
                else
                {
                    var distance = new Distance(zipcodeDistance.DistinceInMinutes, toZipcode);
                    foundDistances.Add(distance);
                }
            }

            if (notFoundDistances.Any())
            {
                var calculatedDistances = _distanceCalculator.Calculate(fromZipcode, notFoundDistances);
                var toSaveDistances = calculatedDistances.Select(d => new ZipcodeDistance
                {
                    CreatedOn = DateTime.Now,
                    DistinceInMinutes = d.TravelDistanceInMinutes,
                    FromZipcode = _unitOfWork.Zipcodes.All.FirstOrDefault(z => z.Value == fromZipcode) ?? new Zipcode { Value = fromZipcode },
                    ToZipcode = _unitOfWork.Zipcodes.All.FirstOrDefault(z => z.Value == d.Zipcode) ?? new Zipcode { Value = d.Zipcode }
                });

                //Also create entries for the other way around: b -> a instead of only a -> b
                var toSaveDistancesReversed = toSaveDistances.Select(d => new ZipcodeDistance
                {
                    CreatedOn = DateTime.Now,
                    DistinceInMinutes = d.DistinceInMinutes,
                    FromZipcode = d.ToZipcode,
                    ToZipcode = d.FromZipcode
                });

                _unitOfWork.ZipcodeDistances.Add(toSaveDistances);
                _unitOfWork.ZipcodeDistances.Add(toSaveDistancesReversed);
                _unitOfWork.SaveChanges();

                foundDistances.AddRange(calculatedDistances);
            }

            return foundDistances;
        }
    }
}
