using Skilled.Business.Core;
using Skilled.Business.Core.Mailing;
using Skilled.CMS.Business.Employees;
using Skilled.CMS.Business.Vacancies;
using Skilled.Domain.CompanyCultures;
using Skilled.Domain.ContactPersons;
using Skilled.Domain.Employees;
using Skilled.Domain.Motivations;
using Skilled.Domain.Permissions;
using Skilled.Domain.Skills;
using Skilled.Domain.ThinkLevels;
using Skilled.Domain.Vacancies;
using Skilled.Domain.Zipcodes;
using Skilled.Infrastructure.CMS.Vacancies;
using System.Diagnostics;

namespace Skilled.Infrastructure
{
    public class CmsUnitOfWork : IUnitOfWork
    {
        private readonly SkilledContext _context;

        public CmsUnitOfWork(SkilledContext context, ILoggedInEmployee loggedInEmployee)
        {
            _context = context;
            context.Database.Log = (s) => Debug.Write(s);

            //Vacancies = new BaseRepository<Vacancy>(context);
            Vacancies = VacancyRepositoryFactory.Create(context, loggedInEmployee);
            Skills = new BaseRepository<Skill>(context);
            ThinkLevels = new BaseRepository<ThinkLevel>(context);
            Zipcodes = new BaseRepository<Zipcode>(context);
            ZipcodeDistances = new BaseRepository<ZipcodeDistance>(context);
            MailingRecipientsComingSoon = new BaseRepository<MailingRecipientComingSoon>(context);
            ContactPersons = new BaseRepository<ContactPerson>(context);
            Employees = new BaseRepository<Employee>(context);
            EmployeeGroups = new BaseRepository<EmployeeGroup>(context);
            Permissions = new BaseRepository<Permission>(context);
        }

        public IRepository<Vacancy> Vacancies { get; }

        public IRepository<Skill> Skills { get; }

        public IRepository<ThinkLevel> ThinkLevels { get; }

        public IRepository<Zipcode> Zipcodes { get; }

        public IRepository<ZipcodeDistance> ZipcodeDistances { get; }

        public IRepository<MailingRecipientComingSoon> MailingRecipientsComingSoon { get; }

        public IRepository<ContactPerson> ContactPersons { get; }

        public IRepository<Employee> Employees { get; }

        public IRepository<EmployeeGroup> EmployeeGroups { get; }

        public IRepository<Permission> Permissions { get; }
        public IRepository<CompanyCulture> CompanyCultures { get; }
        public IRepository<Motivation> Motivations { get; }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}