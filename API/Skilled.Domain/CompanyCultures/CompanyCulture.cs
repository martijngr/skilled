using Skilled.Domain.Employers;
using System.Collections.Generic;

namespace Skilled.Domain.CompanyCultures
{
    public class CompanyCulture
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public virtual ICollection<Employer> Employers {get;set;}
    }
}
