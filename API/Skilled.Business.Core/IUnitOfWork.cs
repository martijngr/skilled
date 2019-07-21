using Skilled.Domain.ContactPersons;
using Skilled.Domain.Employees;
using Skilled.Domain.Permissions;
using Skilled.Domain.Skills;
using Skilled.Domain.ThinkLevels;
using Skilled.Domain.Vacancies;
using Skilled.Domain.Zipcodes;

namespace Skilled.Business.Core
{
    public interface IUnitOfWork
    {
        IRepository<Vacancy> Vacancies { get; }
        IRepository<Skill> Skills { get; }
        IRepository<ThinkLevel> ThinkLevels { get; }
        IRepository<Zipcode> Zipcodes { get; }
        IRepository<ZipcodeDistance> ZipcodeDistances { get; }
        IRepository<ContactPerson> ContactPersons { get; }
        IRepository<Employee> Employees { get; }
        IRepository<EmployeeGroup> EmployeeGroups { get; }
        IRepository<Permission> Permissions { get; }
        int SaveChanges();
    }
}