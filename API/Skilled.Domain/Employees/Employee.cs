using Skilled.Domain.Employers;
using Skilled.Domain.Permissions;

namespace Skilled.Domain.Employees
{
    public class Employee
    {
        public int ID { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public Password Password { get; set; }

        public virtual Employer Employer { get; set; }

        public virtual EmployeeGroup EmployeeGroup { get; set; }
    }
}
