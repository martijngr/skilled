using Skilled.Business.Core;
using Skilled.CQRS;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.CMS.Business.Vacancies.Queries
{
    public class GetAllVacanciesQuery : IQuery<IEnumerable<GetAllVacanciesView>>
    {
    }

    public class GetAllVacanciesQueryHandler : IQueryHandler<GetAllVacanciesQuery, IEnumerable<GetAllVacanciesView>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllVacanciesQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<GetAllVacanciesView> Handle(GetAllVacanciesQuery query)
        {
            return _unitOfWork.Vacancies.All.Select(v => new GetAllVacanciesView
            {
                Id= v.Id,
                Title = v.Title
            }); ;
        }
    }
}
