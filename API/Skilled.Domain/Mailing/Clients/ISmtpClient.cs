using System.Net.Mail;

namespace Skilled.Domain.Mailing.Clients
{
    public interface ISmtpClient
    {
        void SendMail(MailMessage message);
    }
}
