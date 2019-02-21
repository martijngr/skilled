using FluentValidation;
using Skilled.CQRS;
using Skilled.Domain.Mailing.ComingSoon;
using System.Linq;
using System.Web.Http;

namespace Skilled.Api.Controllers
{
    public class MailingController : ApiController
    {
        private readonly CommandProcessor _commandProcessor;

        public MailingController(CommandProcessor commandProcessor)
        {
            _commandProcessor = commandProcessor;
        }

        [HttpPost]
        public IHttpActionResult ComingSoonMailing(AddMailRecipientCommand command)
        {
            try
            {
                _commandProcessor.Handle(command ?? AddMailRecipientCommand.Empty());

                return Ok();
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors.ConvertToString());
            }
        }
    }
}