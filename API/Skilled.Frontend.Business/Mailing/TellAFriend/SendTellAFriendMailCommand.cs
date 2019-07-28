using Skilled.Business.Core.Mailing.Clients;
using Skilled.CQRS;

namespace Skilled.Business.Frontend.Mailing.TellAFriend
{
    public class SendTellAFriendMailCommand
    {
        public string From { get; set; }

        public string To { get; set; }

        public string Message { get; set; }

        public static SendTellAFriendMailCommand Empty() => new SendTellAFriendMailCommand();
    }

    public class SendTellAFriendMailCommandHandler : ICommandHandler<SendTellAFriendMailCommand>
    {
        private readonly ISmtpClient _mailClient;

        public SendTellAFriendMailCommandHandler(ISmtpClient mailClient)
        {
            _mailClient = mailClient;
        }

        public CommandResult Handle(SendTellAFriendMailCommand command)
        {
            var message = TellAFriendMailComposer.ComposeMail(command);
            _mailClient.SendMail(message);

            return new CommandSuccessResult();
        }
    }
}
