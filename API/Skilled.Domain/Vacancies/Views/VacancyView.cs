using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.Domain.Vacancies.Views
{
    public class VacancyView
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string LogoFileName { get; set; }

        public string Description { get; set; }

        public int HoursPerWeek { get; set; }

        public string City { get; set; }

        public decimal SalaryFrom { get; set; }

        public decimal SalaryTill { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Zipcode { get; set; }

        //public virtual Employer Employer { get; set; }

        //public virtual ContactPerson ContactPerson { get; set; }

        //public virtual ThinkLevel ThinkLevel { get; set; }

        //public virtual ICollection<Skill> Skills { get; set; }
    }
}
