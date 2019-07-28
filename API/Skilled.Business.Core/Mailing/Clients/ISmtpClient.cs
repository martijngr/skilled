using System.Net.Mail;

namespace Skilled.Business.Core.Mailing.Clients
{
    public interface ISmtpClient
    {
        void SendMail(MailMessage message);
    }
}
