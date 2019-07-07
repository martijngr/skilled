using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.Domain.Vacancies.Views
{
    public class VacancyView
    {
        public VacancyView()
        {
            Skills = Enumerable.Empty<string>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string VacancyLogoFileName { get; set; }

        public string Description { get; set; }

        public int HoursPerWeek { get; set; }

        public string City { get; set; }

        public decimal SalaryFrom { get; set; }

        public decimal SalaryTill { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Zipcode { get; set; }

        public string ThinkLevel { get; set; }

        public IEnumerable<string> Skills { get; set; }

        public EmployerView Employer { get; set; }

        public ContactPersonView ContactPerson { get; set; }

        //public virtual Employer Employer { get; set; }

        //public virtual ContactPerson ContactPerson { get; set; }

        public class EmployerView
        {
            public string Name { get; set; }

            public string Description { get; set; }
        }

        public class ContactPersonView
        {
            public int Id { get; set; }

            public string Name { get; set; }

            public string Email { get; set; }

            public string PhoneNumber { get; set; }
        }
    }
}
