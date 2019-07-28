using Skilled.Domain.Vacancies;
using System.Collections.Generic;

namespace Skilled.Domain.Skills
{
    public class Skill
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Vacancy> Vacancies { get; set; }
    }
}