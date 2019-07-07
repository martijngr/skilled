using Skilled.Domain.Employees;
using Skilled.Domain.Mailing;
using Skilled.Domain.Mailing.ComingSoon;
using Skilled.Domain.Security;
using Skilled.Domain.Vacancies;
using Skilled.Domain.Zipcodes;
using System.Data.Entity;

namespace Skilled.Infrastructure
{
    public class SkilledContext : DbContext
    {
        public SkilledContext() 
            : base("SkilledContext")
        {
        }

        public DbSet<Vacancy> Vacancies { get; set; }

        public DbSet<ZipcodeDistance> ZipcodeDistances { get; set; }

        public DbSet<MailingRecipientComingSoon> MailingRecipientsComingSoon { get; set; }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MailingRecipientComingSoon>().ToTable("MailingListComingSoon");

            modelBuilder.ComplexType<Password>()
                .Property(p => p.EncryptedPassword)
                .HasColumnName("Password");

            modelBuilder.ComplexType<Password>()
                .Property(p => p.Salt)
                .HasColumnName("Salt");
        }

        private void FixEfProviderServicesProblem()
        {
            // The Entity Framework provider type 'System.Data.Entity.SqlServer.SqlProviderServices, EntityFramework.SqlServer'
            // for the 'System.Data.SqlClient' ADO.NET provider could not be loaded. 
            // Make sure the provider assembly is available to the running application. 
            // See http://go.microsoft.com/fwlink/?LinkId=260882 for more information.
            var instance = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
        }
    }
}