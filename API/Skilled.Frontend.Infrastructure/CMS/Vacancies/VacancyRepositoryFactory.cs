using Skilled.Business.Core;
using Skilled.CMS.Business.Employees;
using Skilled.CMS.Business.Vacancies;

namespace Skilled.Infrastructure.CMS.Vacancies
{
    public class VacancyRepositoryFactory
    {
        public static IVacancyRepository Create(SkilledContext context, ILoggedInEmployee loggedInEmployee)
        {
            if (loggedInEmployee != null)
            {
                return new EmployeeVacancyRepository(context, loggedInEmployee.EmployerId);
            }

            return new NotAuthorizedRepository();
        }
    }
}
