using Skilled.CQRS;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Business.Core.Skills.Queries
{
    public class GetTalentByIdQuery : IQuery<IEnumerable<string>>
    {
        public IEnumerable<int> TalentIds { get; set; }
    }

    public class GetTalentByIdQueryHandler : IQueryHandler<GetTalentByIdQuery, IEnumerable<string>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetTalentByIdQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<string> Handle(GetTalentByIdQuery query)
        {
            var talentNames = _unitOfWork.Skills.All
                .Where(t => query.TalentIds.Contains(t.Id))
                .Select(t => t.Name)
                .ToList();

            return talentNames;
        }
    }
}
