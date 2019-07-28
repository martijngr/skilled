using FluentValidation;
using Skilled.Business;
using Skilled.Business.Frontend.Mailing.ComingSoon;
using Skilled.Business.Frontend.Mailing.TellAFriend;
using Skilled.CQRS;
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

        [HttpPost]
        public IHttpActionResult SendTellAFriendMail(SendTellAFriendMailCommand command)
        {
            try
            {
                _commandProcessor.Handle(command ?? SendTellAFriendMailCommand.Empty());

                return Ok();
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors.ConvertToString());
            }
        }
    }
}