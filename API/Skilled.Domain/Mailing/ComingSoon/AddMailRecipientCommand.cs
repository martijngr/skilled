﻿using FluentValidation;
using Skilled.CQRS;
using System;

namespace Skilled.Domain.Mailing.ComingSoon
{
    public class AddMailRecipientCommand
    {
        public string Email { get; set; }

        public static AddMailRecipientCommand Empty() => new AddMailRecipientCommand();
    }

    public class AddMailRecipientCommandHandler : ICommandHandler<AddMailRecipientCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<MailingRecipient> _validator;

        public AddMailRecipientCommandHandler(IUnitOfWork unitOfWork, IValidator<MailingRecipient> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public void Handle(AddMailRecipientCommand command)
        {
            var mailingRecipient = CreateMailingRecipient(command);

            _validator.ValidateAndThrow(mailingRecipient);

            _unitOfWork.MailingRecipientsComingSoon.Add(mailingRecipient);

            _unitOfWork.SaveChanges();
        }

        private MailingRecipientComingSoon CreateMailingRecipient(AddMailRecipientCommand command)
        {
            return new MailingRecipientComingSoon
            {
                CreationDate = DateTime.Now,
                Email = command.Email,
            };
        }
    }
}
