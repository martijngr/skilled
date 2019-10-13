using Skilled.Business.Core.CompanyCultures.Views;
using Skilled.CQRS;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Business.Core.CompanyCultures.Queries
{
    public class GetCompanyCulturesQuery : IQuery<IEnumerable<CompanyCultureViewModel>>
    {
    }

    public class GetCompanyCulturesQueryHandler : IQueryHandler<GetCompanyCulturesQuery, IEnumerable<CompanyCultureViewModel>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetCompanyCulturesQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<CompanyCultureViewModel> Handle(GetCompanyCulturesQuery query)
        {
            return 
                _unitOfWork
                .CompanyCultures
                .All
                .Select(c => new CompanyCultureViewModel
                {
                    Description = c.Description,
                    Id = c.Id,
                    Name = c.Name
                })
                .ToList();
        }
    }
}
