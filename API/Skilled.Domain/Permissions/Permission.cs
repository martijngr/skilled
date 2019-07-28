using System.Collections.Generic;

namespace Skilled.Domain.Permissions
{
    public class Permission
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<EmployeeGroup> EmployeeGroups { get; set; }
    }
}
