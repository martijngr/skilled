using Skilled.Business.Core.Motivations.Views;
using Skilled.CQRS;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Business.Core.Motivations.Queries
{
    public class GetMotivationsQuery : IQuery<IEnumerable<MotivationViewModel>>
    {
    }

    public class GetMotivationsQueryHandler : IQueryHandler<GetMotivationsQuery, IEnumerable<MotivationViewModel>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetMotivationsQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<MotivationViewModel> Handle(GetMotivationsQuery query)
        {
            return 
                _unitOfWork
                .Motivations
                .All
                .Select(m => new MotivationViewModel
                {
                    Description = m.Description,
                    Id = m.Id,
                    Name = m.Name
                })
                .ToList();
        }
    }
}
