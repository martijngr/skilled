using System;

namespace Skilled.Domain.Employees
{
    public sealed class Password : IEquatable<Password>
    {
        private Password()
        {
            // needed for EF to create an instance of this class.
        }
        public Password(string encryptedPassword, string salt)
        {
            EncryptedPassword = encryptedPassword;
            Salt = salt;
        }

        public string EncryptedPassword { get; private set; }

        public string Salt { get; private set; }

        public override bool Equals(object obj) => Equals(obj as Password);

        public bool Equals(Password password)
        {
            if (password == null)
                return false;

            return password.EncryptedPassword == EncryptedPassword &&
                    password.Salt == Salt;
        }

        public override int GetHashCode() => EncryptedPassword.GetHashCode() ^ Salt.GetHashCode();

        public static bool operator == (Password a, Password b) =>
            // we can't use == here because it will result in a loop
            // here are 2 checks:
            //  1. if a and b both are null return true
            //  2. if a != null && a is the same as b
            (ReferenceEquals(a, null) && ReferenceEquals(b, null)) ||
            (!ReferenceEquals(a, null) && a.Equals(b));

        public static bool operator != (Password a, Password b) => !(a == b);
    }
}
