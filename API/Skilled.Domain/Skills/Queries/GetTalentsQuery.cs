using Skilled.CQRS;
using Skilled.Domain.Skills.Views;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Domain.Skills.Queries
{
    public class GetTalentsQuery : IQuery<IEnumerable<TalentSearchItem>>
    {
        public string Keyword { get; set; }
    }

    public class SearchTalentQueryHandler : IQueryHandler<GetTalentsQuery, IEnumerable<TalentSearchItem>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public SearchTalentQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<TalentSearchItem> Handle(GetTalentsQuery query)
        {
            var talents = _unitOfWork.Skills.All;

            if (!string.IsNullOrEmpty(query.Keyword))
                talents = talents.Where(s => s.Name.Contains(query.Keyword));

            return talents.Select(s => new TalentSearchItem
            {
                Id = s.Id,
                Name = s.Name
            }).ToList();
        }
    }
}
