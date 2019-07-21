using Skilled.Business.Core;
using Skilled.Business.Frontend.Mailing.ComingSoon;

namespace Skilled.Business.Frontend
{
    public interface IFrontEndUnitOfWork : IUnitOfWork
    {
        IRepository<MailingRecipientComingSoon> MailingRecipientsComingSoon { get; }
    }
}