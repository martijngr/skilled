using Skilled.CQRS;
using System.Web.Http;

namespace Skilled.Api.Controllers
{
    public class EmployeeController : ApiController
    {
        private readonly CommandProcessor _commandProcessor;

        public EmployeeController(CommandProcessor commandProcessor)
        {
            _commandProcessor = commandProcessor;
        }


    }
}