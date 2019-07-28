using Skilled.Business.Core;
using Skilled.CMS.Business.Vacancies;
using Skilled.Domain.Vacancies;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Infrastructure.CMS.Vacancies
{
    public class NotAuthorizedRepository : IVacancyRepository
    {
        public IEnumerable<Vacancy> All => throw new NotImplementedException();

        IQueryable<Vacancy> IRepository<Vacancy>.All => throw new NotImplementedException();

        public void Add(Vacancy item)
        {
            throw new NotImplementedException();
        }

        public void Add(IEnumerable<Vacancy> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(Vacancy item)
        {
            throw new NotImplementedException();
        }
    }
}
