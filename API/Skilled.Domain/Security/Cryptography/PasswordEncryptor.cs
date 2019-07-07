using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Skilled.Domain.Security.Cryptography
{
    public class PasswordEncryptor
    {
        public Password EncryptPassword(string plainPassword)
        {
            var saltBytes = GetSalt();
            var salt = Convert.ToBase64String(saltBytes);

            return EncryptPassword(plainPassword, salt);
        }
        public Password EncryptPassword(string plainPassword, string salt)
        {
            var saltBytes = Convert.FromBase64String(salt);
            var plainPasswordBytes = Encoding.UTF8.GetBytes(plainPassword);
            var hashedPasswordBytes = Hash(plainPasswordBytes, saltBytes);
            var hashedPassword = Convert.ToBase64String(hashedPasswordBytes);

            return new Password(hashedPassword, salt);
        }

        public bool ComparePasswords(string passwordToCheck, Password storedPassword)
        {
            var hashedPassword = EncryptPassword(passwordToCheck, storedPassword.Salt);

            return hashedPassword == storedPassword;
        }

        public byte[] GetSalt()
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            return salt;
        }

        public byte[] Hash(byte[] value, byte[] salt)
        {
            byte[] saltedValue = value.Concat(salt).ToArray();

            return new SHA256Managed().ComputeHash(saltedValue);
        }
    }
}
