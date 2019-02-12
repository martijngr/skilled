using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Skilled.Domain.DistanceCalculators.Google
{
    public class GoogleDistanceCalculator : IDistanceCalculator
    {
        private const string baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json";

        public IEnumerable<Distance> Calculate(string fromZipcode, IEnumerable<string> toZipcodes)
        {
            var toZipcodeParams = string.Join("|", toZipcodes.Distinct().Select(z => $"{z},NL"));
            var urlParams = $"?origins={fromZipcode},NL&destinations={toZipcodeParams}&key=AIzaSyChWYgJurwZQUGBdGQFLpyNkp8_ql-qSUo";
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = client.GetAsync(urlParams).ConfigureAwait(false).GetAwaiter().GetResult();
                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = response.Content.ReadAsStringAsync().Result;
                    var res = JsonConvert.DeserializeObject<Response>(jsonResponse);
                    var distances = new List<Distance>();

                    var durations = res.rows.SelectMany(r => r.elements);
                    for (int i = 0; i < toZipcodes.Count(); i++)
                    {
                        if (durations.ElementAt(i) == null || durations.ElementAt(i).duration == null)
                            continue;

                        var zipcode = toZipcodes.ElementAt(i);
                        var minutes = durations.ElementAt(i).duration.value / 60;

                        var distance = new Distance(minutes, zipcode);
                        distances.Add(distance);
                    }

                    return distances;
                }
                else
                {
                    Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
                }

                return null;

            }
        }
    }
}