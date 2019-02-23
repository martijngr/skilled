using System.Net.Mail;

namespace Skilled.Domain.Mailing.TellAFriend
{
    public class TellAFriendMailComposer
    {
        public static MailMessage ComposeMail(SendTellAFriendMailCommand command)
        {
            var mail = new MailMessage()
            {
                Body = $"<p>{command.Message}</p><p>Check it out en ga naar <a href='http://www.skilled.nu'>Skilled.nu</a></p>".NewlinesToHtmlBrs(),
                Subject = $"{ command.From } raadt je Skilled aan!",
                IsBodyHtml = true,
                
            };

            mail.To.Add(command.To);

            return mail;
        }
    }
}
