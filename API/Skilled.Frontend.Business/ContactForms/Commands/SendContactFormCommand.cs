using Skilled.Business.Core.Mailing.Clients;
using Skilled.CQRS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.Frontend.Business.ContactForms.Commands
{
    public class SendContactFormCommand
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }
    }

    public class SendContactFormCommandHandler : ICommandHandler<SendContactFormCommand>
    {
        private readonly ISmtpClient _smtpClient;

        public SendContactFormCommandHandler(ISmtpClient smtpClient)
        {
            _smtpClient = smtpClient;
        }

        public CommandResult Handle(SendContactFormCommand command)
        {
            var mail = ComposeMail(command);

            _smtpClient.SendMail(mail);

            return new CommandSuccessResult();
        }

        private MailMessage ComposeMail(SendContactFormCommand command)
        {
            var mail = new MailMessage();

            mail.From = new MailAddress("contact@skilled.nu", "Skilled - Contactformulier");
            mail.To.Add(new MailAddress("mdvanderwaals@gmail.com"));
            mail.To.Add(new MailAddress("martijngr@gmail.com"));
            mail.Subject = "Skilled - Contactformulier ingevuld";
            mail.Body = $"Naam: {command.Name}{Environment.NewLine}" +
                $"Email: {command.Email}{Environment.NewLine}" +
                $"Onderwerp: {command.Subject}{Environment.NewLine}" +
                $"Bericht: {command.Message}";

            return mail;

        }
    }
}
