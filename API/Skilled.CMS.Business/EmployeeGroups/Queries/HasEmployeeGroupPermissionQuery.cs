using Skilled.Business.Core;
using Skilled.CQRS;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.CMS.Business.EmployeeGroups.Queries
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
            var groupPermissions = _unitOfWork.EmployeeGroups
                                    .All
                                    .Where(g => g.Id == query.EmployeeGroupId)
                                    .SelectMany(g => g.Permissions)
                                    .Select(p => p.Name)
                                    .ToList();

            return HasUserPermission(groupPermissions, query.Permission);
        }

        private bool HasUserPermission(List<string> groupPermissions, string permission)
        {
            var requestedPermission = new SplittedPermission(permission);

            return groupPermissions
                .Select(p => new SplittedPermission(p))
                .Any(p => p.ContainsRight(requestedPermission));
        }

        private class SplittedPermission
        {
            public SplittedPermission(string permission)
            {
                var permissionParts = permission.Split(new[] { "_" }, StringSplitOptions.RemoveEmptyEntries);
                Subject = permissionParts.FirstOrDefault();
                Right = permissionParts.Skip(1).FirstOrDefault();
                OriginalValue = permission;
            }

            public string Subject { get; private set; }

            public string Right { get; private set; }

            public string OriginalValue { get; set; }

            public bool ContainsRight(SplittedPermission permission)
            {
                if (permission.OriginalValue == OriginalValue)
                    return true;

                return Right.Contains("full") && permission.Subject == Subject;
            }
        }
    }
}