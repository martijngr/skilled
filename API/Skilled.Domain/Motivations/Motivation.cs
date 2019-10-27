using Skilled.Domain.Vacancies;
using System.Collections.Generic;

namespace Skilled.Domain.Motivations
{
    public class Motivation
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<Vacancy> Vacancies { get; set; }
    }
}
