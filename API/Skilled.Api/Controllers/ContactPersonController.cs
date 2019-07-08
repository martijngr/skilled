using Skilled.CQRS;
using Skilled.Domain.ContactPersons.Queries;
using Skilled.Domain.Employees.Commands;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace Skilled.Api.Controllers
{
    public class ContactPersonController : ApiController
    {
        private readonly QueryProcessor _queryProcessor;
        private readonly CommandProcessor _commandProcessor;

        public ContactPersonController(QueryProcessor queryProcessor, CommandProcessor commandProcessor)
        {
            _queryProcessor = queryProcessor;
            _commandProcessor = commandProcessor;
        }

        [HttpGet]
        public HttpResponseMessage ProfilePicture([FromUri] int contactPersonId)
        {
            var filePath = _queryProcessor.Handle(new GetProfilePicturePathByContactPersonId(contactPersonId));

            var response = new HttpResponseMessage();
            response.Content = new StreamContent(new FileStream(filePath, FileMode.Open)); // this file stream will be closed by lower layers of web api for you once the response is completed.
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");

            return response;
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