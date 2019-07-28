using Skilled.Business;
using Skilled.CMS.Business.Employees;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace Skilled.CMS.Api
{
    public class LoggedInEmployee : ILoggedInEmployee
    {
        private readonly ClaimsPrincipal _claimsPrincipal;

        public LoggedInEmployee()
        {
            _claimsPrincipal = HttpContext.Current.User as ClaimsPrincipal;
        }

        public int Id => -1;

        public string Name => GetClaim(ClaimTypes.Name);

        public int EmployerId => GetClaim("EmployerId").ToInt();

        public int EmployeeGroupId => GetClaim(ClaimTypes.Role).ToInt();

        private string GetClaim(string claim)
        {
            return _claimsPrincipal.Claims.FirstOrDefault(c => c.Type == claim).Value;
        }
    }
}