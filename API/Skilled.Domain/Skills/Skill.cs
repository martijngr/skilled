using Skilled.Domain.Vacancies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.Domain.Skills
{
    public class Skill
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Vacancy> Vacancies { get; set; }
    }
}