namespace Skilled.Business.Core.Security.Permissions
{
    public struct PermissionName
    {
        public PermissionName(string name)
        {
            Name = name;
        }

        public string Name { get; }
    }

    public class PermissionList
    {
        public static string Vacancy_create => "vacancy_create";
        public static string Vacancy_read => "vacancy_read";
        public static string Vacancy_delete => "vacancy_delete";
        public static string Vacancy_full => "vacancy_full";
        public static string Companies_create => "companies_create";
        public static string Companies_read => "companies_read";
        public static string Companies_full => "companies_full";
    }
}
