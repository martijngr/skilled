using FluentValidation;

namespace Skilled.Domain.Mailing
{
    public class MailingRecipientValidator : AbstractValidator<MailingRecipient>
    {
        public MailingRecipientValidator()
        {
            RuleFor(r => r.Email)
                .NotNull()
                .WithMessage("E-mailadres is verplicht")
                .EmailAddress()
                .WithMessage("Ongedlig e-mailadres");
        }
    }
}
