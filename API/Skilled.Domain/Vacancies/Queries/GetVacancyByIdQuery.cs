using Skilled.CQRS;
using Skilled.Domain.Vacancies.Views;
using System.Linq;

namespace Skilled.Domain.Vacancies.Queries
{
    public class GetVacancyByIdQuery : IQuery<VacancyView>
    {
        public GetVacancyByIdQuery(int vacancyId)
        {
            VacancyId = vacancyId;
        }

        public int VacancyId { get; }
    }

    public class GetVacancyByIdQueryHandler : IQueryHandler<GetVacancyByIdQuery, VacancyView>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetVacancyByIdQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public VacancyView Handle(GetVacancyByIdQuery query)
        {
            return _unitOfWork
                .Vacancies
                .All
                .Where(v => v.Id == query.VacancyId)
                .Select(v => new VacancyView
                {
                    City = v.City,
                    CreatedOn = v.CreatedOn,
                    Description = v.Description,
                    HoursPerWeek = v.HoursPerWeek,
                    Id = v.Id,
                    VacancyLogoFileName = v.LogoFileName,
                    SalaryFrom = v.SalaryFrom,
                    SalaryTill = v.SalaryTill,
                    Title = v.Title,
                    Zipcode = v.Zipcode.Value,
                    ContactPerson = new VacancyView.ContactPersonView
                    {
                        AvatarFileName = "",
                        Email = v.ContactPerson.Email,
                        Name = v.ContactPerson.Name
                    },
                    Skills = v.Skills.Select(s => s.Name),
                    ThinkLevel = v.ThinkLevel.Name,
                    Employer = new VacancyView.EmployerView
                    {
                        Description = v.Employer.Description,
                        Name= v.Employer.Name
                    }
                })
                .FirstOrDefault();
        }
    }
}