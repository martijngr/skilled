using Skilled.Business.Core;
using Skilled.Business.Frontend.Vacancies.Views;
using Skilled.CQRS;
using Skilled.Domain.PathHandling;
using Skilled.Domain.Settings;
using System.IO;
using System.Linq;

namespace Skilled.Business.Frontend.Vacancies.Queries
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
        private readonly IAppSettings _appSettings;

        public GetVacancyByIdQueryHandler(IUnitOfWork unitOfWork, IAppSettings appSettings)
        {
            _unitOfWork = unitOfWork;
            _appSettings = appSettings;
        }

        public VacancyView Handle(GetVacancyByIdQuery query)
        {
            return _unitOfWork
                .Vacancies
                .All
                .Where(v => v.Id == query.VacancyId)
                .ToList()
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
                        Id = v.ContactPerson.Id,
                        Email = v.ContactPerson.Email,
                        Name = v.ContactPerson.Name,
                        PhoneNumber = v.ContactPerson.PhoneNumber
                    },
                    Skills = v.Skills.Select(s => s.Name),
                    ThinkLevel = v.ThinkLevel.Name,
                    Employer = new VacancyView.EmployerView
                    {
                        Description = v.Employer.Description,
                        Name= v.Employer.Name
                    },
                    CompanyLogoUrl = _appSettings.MediaUrl.CombineUrl("Employers", v.Employer.Id.ToString(), v.LogoFileName)
                })
                .FirstOrDefault();
        }
    }
}