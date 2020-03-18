using Skilled.Domain.CompanyCultures;
using Skilled.Domain.ContactPersons;
using Skilled.Domain.Employers;
using Skilled.Domain.Motivations;
using Skilled.Domain.Skills;
using Skilled.Domain.ThinkLevels;
using Skilled.Domain.Zipcodes;
using System;
using System.Collections.Generic;

namespace Skilled.Domain.Vacancies
{
    public class Vacancy
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string LogoFileName { get; set; }

        public string Description { get; set; }

        public int HoursPerWeek { get; set; }

        public string City { get; set; }

        public decimal SalaryFrom { get; set; }

        public decimal SalaryTill { get; set; }

        public string JobApplicationLink { get; set; }

        public DateTime CreatedOn { get; set; }

        public virtual Zipcode Zipcode { get; set; }

        public virtual Employer Employer { get; set; }

        public virtual ContactPerson ContactPerson { get; set; }

        public virtual ThinkLevel ThinkLevel { get; set; }

        public virtual ICollection<Skill> Skills { get; set; }

        public virtual ICollection<Motivation> Motivations { get; set; }

        public virtual ICollection<CompanyCulture> CompanyCultures { get; set; }
    }
}