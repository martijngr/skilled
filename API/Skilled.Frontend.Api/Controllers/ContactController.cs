using Skilled.CQRS;
using Skilled.Frontend.Business.ContactForms.Commands;
using System.Web.Http;

namespace Skilled.Frontend.Api.Controllers
{
    public class ContactController : ApiController
    {
        private readonly CommandProcessor _commandProcessor;

        public ContactController(CommandProcessor commandProcessor)
        {
            _commandProcessor = commandProcessor;
        }

        [HttpPost]
        public IHttpActionResult Submit(SendContactFormCommand command)
        {
            _commandProcessor.Handle(command);

            return Ok();
        }
    }
}