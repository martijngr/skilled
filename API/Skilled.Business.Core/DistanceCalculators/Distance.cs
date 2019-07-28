namespace Skilled.Business.Core.DistanceCalculators
{
    public class Distance
    {
        public Distance(int travelDistanceInMinutes, string zipcode)
        {
            TravelDistanceInMinutes = travelDistanceInMinutes;
            Zipcode = zipcode;
        }

        public int TravelDistanceInMinutes { get; }

        public string Zipcode { get; }
    }
}
