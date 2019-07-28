namespace Skilled.CMS.Business.Employees
{
    public interface ILoggedInEmployee
    {
        int Id { get; }

        string Name { get; }

        int EmployerId { get; }

        int EmployeeGroupId { get; }
    }
}
