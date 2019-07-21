using Skilled.CQRS;
using Skilled.Domain.PathHandling;
using System.IO;
using System.Linq;

namespace Skilled.Business.Frontend.Vacancies.Queries
{
    public class GetVacancyLogoQuery : IQuery<string>
    {
        public int VacancyId { get; set; }
    }

    public class GetVacancyLogoQueryHandler : IQueryHandler<GetVacancyLogoQuery, string>
    {
        private readonly IFrontEndUnitOfWork _unitOfWork;
        private readonly IPathResolver _pathResolver;

        public GetVacancyLogoQueryHandler(IFrontEndUnitOfWork unitOfWork, IPathResolver pathResolver)
        {
            _unitOfWork = unitOfWork;
            _pathResolver = pathResolver;
        }

        public string Handle(GetVacancyLogoQuery query)
        {
            var logoData = _unitOfWork
                .Vacancies
                .All
                .Where(v => v.Id == query.VacancyId)
                .Select(v => new { v.LogoFileName, EmployerId = v.Employer.Id })
                .FirstOrDefault();

            return Path.Combine(_pathResolver.GetEmployerRootPath(logoData.EmployerId), logoData.LogoFileName);
        }
    }
}