using Skilled.CQRS;
using Skilled.Domain.Mailing.Clients;

namespace Skilled.Domain.Mailing.TellAFriend
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

        public void Handle(SendTellAFriendMailCommand command)
        {
            var message = TellAFriendMailComposer.ComposeMail(command);
            _mailClient.SendMail(message);
        }
    }
}
