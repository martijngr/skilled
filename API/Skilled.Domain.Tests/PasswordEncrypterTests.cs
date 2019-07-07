using Microsoft.VisualStudio.TestTools.UnitTesting;
using Skilled.Domain.Security;
using Skilled.Domain.Security.Cryptography;

namespace Skilled.Domain.Tests
{
    [TestClass]
    public class PasswordEncrypterTests
    {
        [TestMethod]
        public void Should_Create_New_Salt_For_Each_Password()
        {
            // Given
            var encryptor = new PasswordEncryptor();
            var passwordPhrase = "MijnGeheim";

            // When
            var password1 = encryptor.EncryptPassword(passwordPhrase);
            var password2 = encryptor.EncryptPassword(passwordPhrase);

            // Then
            Assert.AreNotEqual(password1.Salt, password2.Salt);
        }

        [TestMethod]
        public void Should_return_true_when_password_and_salt_matches_given_password()
        {
            // Given
            var encryptor = new PasswordEncryptor();
            var storedPassword = new Password("UCnYe3MXz11RqTwoLfFpb2k2OUjUtMq/LMcLmJgDB8Q=", "yooQLE9ntD/yjCxi8bN35w==");

            // When
            var arePasswordsTheSame = encryptor.ComparePasswords("MijnGeheim", storedPassword);

            // Then
            Assert.AreEqual(arePasswordsTheSame, true);
        }

        [TestMethod]
        public void Should_return_false_when_given_password_not_matches_stored_password()
        {
            // Given
            var encryptor = new PasswordEncryptor();
            var storedPassword = new Password("UCnYe3MXz11RqTwoLfFpb2k2OUjUtMq/LMcLmJgDB8Q=", "yooQLE9ntD/yjCxi8bN35w==");

            // When
            var arePasswordsTheSame = encryptor.ComparePasswords("MijnGeheim2", storedPassword);

            // Then
            Assert.AreEqual(arePasswordsTheSame, false);
        }

        [TestMethod]
        public void Should_return_false_when_given_password_is_correct_but_stored_hash_is_corrupted()
        {
            // Given
            var encryptor = new PasswordEncryptor();
            var storedPassword = new Password("UCnYe3MXz11RqTwoLfFpb2k2OUjUtMq/LMcLmJgDB8Q=", "youQLE9ntD/yjCxi8bN35w==");

            // When
            var arePasswordsTheSame = encryptor.ComparePasswords("MijnGeheim", storedPassword);

            // Then
            Assert.AreEqual(arePasswordsTheSame, false);
        }
    }
}
