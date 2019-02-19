using Skilled.CQRS;
using System;

namespace Skilled.Domain.Mailing.ComingSoon
{
    public class AddMailRecipientCommand
    {
        public string Email { get; set; }
    }

    public class AddMailRecipientCommandHandler : ICommandHandler<AddMailRecipientCommand>
    {
        private readonly IUnitOfWork _unitOfWork;

        public AddMailRecipientCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void Handle(AddMailRecipientCommand command)
        {
            _unitOfWork.MailingRecipientsComingSoon.Add(new MailingRecipientComingSoon
            {
                CreationDate = DateTime.Now,
                Email = command.Email,
            });

            _unitOfWork.SaveChanges();
        }
    }
}
