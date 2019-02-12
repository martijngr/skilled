using Skilled.Domain.ContactPersons;
using System.Collections.Generic;

namespace Skilled.Domain.Employers
{
    public class Employer
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string LogoFilename { get; set; }

        public string Description { get; set; }

        public string Zipcode { get; set; }

        public virtual ICollection<ContactPerson> ContactPeople { get; set; }
    }
}
