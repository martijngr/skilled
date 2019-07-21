using System.Collections.Generic;

namespace Skilled.Domain.Permissions
{
    public class EmployeeGroup
    {
        public int Id { get; set; }

        public virtual ICollection<Permission> Permissions { get; set; }
    }
}
