using Skilled.CQRS;
using Skilled.Domain.Mailing.ComingSoon;
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
        public void ComingSoonMailing(AddMailRecipientCommand command)
        {
            _commandProcessor.Handle(command);
        }
    }
}