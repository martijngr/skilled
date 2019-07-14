using Skilled.Domain.Security.Permissions;
using System.Collections.Generic;

namespace Skilled.Domain.Employees.Commands
{
    public class LoginEmployeeResult
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int EmployeeGroupId { get; set; }
    }
}