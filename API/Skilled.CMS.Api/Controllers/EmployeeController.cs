using Skilled.CMS.Business.Employees.Commands;
using Skilled.CQRS;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Skilled.CMS.Api.Controllers
{
    public class EmployeeController : ApiController
    {
        private readonly QueryProcessor _queryProcessor;
        private readonly CommandProcessor _commandProcessor;

        public EmployeeController(QueryProcessor queryProcessor, CommandProcessor commandProcessor)
        {
            _queryProcessor = queryProcessor;
            _commandProcessor = commandProcessor;
        }

        [HttpPost]
        public HttpResponseMessage Login(LoginEmployeeCommand command)
        {
            var result = _commandProcessor.Handle(command);

            if (result.Success)
                return new HttpResponseMessage(HttpStatusCode.OK);

            return new HttpResponseMessage(HttpStatusCode.Unauthorized);
        }
    }
}
