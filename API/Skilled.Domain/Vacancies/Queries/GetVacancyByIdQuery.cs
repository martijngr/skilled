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
                    Description = v.Description,
                    HoursPerWeek = v.HoursPerWeek,
                    Id = v.Id,
                    SalaryFrom = v.SalaryFrom,
                    SalaryTill = v.SalaryTill,
                    Title = v.Title,
                    Zipcode = v.Zipcode.Value
                })
                .FirstOrDefault();
        }
    }
}