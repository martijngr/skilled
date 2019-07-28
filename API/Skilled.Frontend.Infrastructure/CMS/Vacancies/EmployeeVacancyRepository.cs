using Skilled.Business.Core;
using Skilled.CMS.Business.Vacancies;
using Skilled.Domain.Vacancies;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Infrastructure.CMS.Vacancies
{
    public class EmployeeVacancyRepository : IVacancyRepository
    {
        private readonly SkilledContext _context;
        private readonly int _employerId;

        public EmployeeVacancyRepository(SkilledContext context, int employerId)
        {
            _context = context;
            _employerId = employerId;
        }

        public IQueryable<Vacancy> All => _context
                                            .Set<Vacancy>()
                                            .Where(v => v.ContactPerson.Employer.Id == _employerId);

        public void Add(Vacancy item)
        {
            throw new System.NotImplementedException();
        }

        public void Add(IEnumerable<Vacancy> items)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(Vacancy item)
        {
            throw new System.NotImplementedException();
        }
    }
}
