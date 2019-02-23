using System.Net.Mail;

namespace Skilled.Domain.Mailing.Clients
{
    public class SmtpMailClient : ISmtpClient
    {
        public void SendMail(MailMessage message)
        {
            var client = new SmtpClient();
            client.Send(message);
        }
    }
}
