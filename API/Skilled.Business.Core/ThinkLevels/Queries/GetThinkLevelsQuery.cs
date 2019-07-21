using Skilled.Business.Core.ThinkLevels.Views;
using Skilled.CQRS;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Business.Core.ThinkLevels.Queries
{
    public class GetThinkLevelsQuery : IQuery<IEnumerable<ThinkLevelView>>
    {
    }


    public class GetThinkLevelsQueryHandler : IQueryHandler<GetThinkLevelsQuery, IEnumerable<ThinkLevelView>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetThinkLevelsQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<ThinkLevelView> Handle(GetThinkLevelsQuery query)
        {
            return _unitOfWork.ThinkLevels.All.Select(t => new ThinkLevelView
            {
                Id = t.Id,
                Name = t.Name
            });
        }
    }
}
