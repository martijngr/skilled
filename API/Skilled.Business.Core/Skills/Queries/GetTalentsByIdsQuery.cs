using Skilled.CQRS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.Business.Core.Skills.Queries
{
    public class GetTalentsByIdsQuery : IQuery<IEnumerable<string>>
    {
        public IEnumerable<int> TalentIds { get; set; }
    }

    public class GetTalentsByIdsQueryHandler : IQueryHandler<GetTalentsByIdsQuery, IEnumerable<string>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetTalentsByIdsQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<string> Handle(GetTalentsByIdsQuery query)
        {
            return _unitOfWork.Skills.All
                .Where(t => query.TalentIds.Contains(t.Id))
                .Select(s => s.Name);
        }
    }
}
