using Skilled.Domain.Employers;

namespace Skilled.Domain.ContactPersons
{
    public class ContactPerson
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string ProfilePictureName { get; set; }

        public virtual Employer Employer { get; set; }
    }
}