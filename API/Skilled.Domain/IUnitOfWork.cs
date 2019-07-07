using Skilled.Domain.ContactPersons;
using Skilled.Domain.Mailing.ComingSoon;
using Skilled.Domain.Skills;
using Skilled.Domain.ThinkLevels;
using Skilled.Domain.Vacancies;
using Skilled.Domain.Zipcodes;

namespace Skilled.Domain
{
    public interface IUnitOfWork
    {
        IRepository<Vacancy> Vacancies { get; }
        IRepository<Skill> Skills { get; }
        IRepository<ThinkLevel> ThinkLevels { get; }
        IRepository<Zipcode> Zipcodes { get; }
        IRepository<ZipcodeDistance> ZipcodeDistances { get; }
        IRepository<MailingRecipientComingSoon> MailingRecipientsComingSoon { get; }
        IRepository<ContactPerson> ContactPersons { get; }

        int SaveChanges();
    }
}