using System;

namespace Skilled.Domain.Mailing
{
    public class MailingRecipient
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; set; }

        public string Email { get; set; }
    }
}