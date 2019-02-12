using System;

namespace Skilled.Domain.Zipcodes
{
    public class ZipcodeDistance
    {
        public int Id { get; set; }

        public virtual Zipcode FromZipcode { get; set; }

        public virtual Zipcode ToZipcode { get; set; }

        public int DistinceInMinutes { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}