using Skilled.CQRS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.Domain.Security.Queries
{
    public class HasEmployeeGroupPermissionQuery : IQuery<bool>
    {
        public HasEmployeeGroupPermissionQuery(int employeeGroupId, string permission)
        {
            EmployeeGroupId = employeeGroupId;
            Permission = permission;
        }

        public int EmployeeGroupId { get; }

        public string Permission { get; }
    }

    public class HasEmployeeGroupPermissionQueryHandler : IQueryHandler<HasEmployeeGroupPermissionQuery, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public HasEmployeeGroupPermissionQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public bool Handle(HasEmployeeGroupPermissionQuery query)
        {
            return _unitOfWork.EmployeeGroups
                              .All
                              .Where(g => g.Id == query.EmployeeGroupId)
                              .SelectMany(g => g.Permissions)
                              .Any(p => p.Name == query.Permission);
        }
    }
}
