using Skilled.CQRS;
using Skilled.Domain.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.Domain.Employees.Commands
{
    public class LoginEmployeeCommand
    {
        public LoginEmployeeCommand(string email, string password)
        {
            Email = email;
            Password = password;
        }

        public string Email { get; }

        public string Password { get; set; }
    }

    public class LoginEmployeeCommandHandler : ICommandHandler<LoginEmployeeCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PasswordEncryptor _passwordEncryptor;

        public LoginEmployeeCommandHandler(IUnitOfWork unitOfWork, PasswordEncryptor passwordEncryptor)
        {
            _unitOfWork = unitOfWork;
            _passwordEncryptor = passwordEncryptor;
        }

        public void Handle(LoginEmployeeCommand command)
        {
            var employee = _unitOfWork.Employees.All.FirstOrDefault(e => e.Email == command.Email);

            if (employee == null)
                throw new ArgumentException($"Invalid login attempt with email {command.Email}");

            if (!_passwordEncryptor.ComparePasswords(command.Password, employee.Password))
                throw new ArgumentException($"Invalid login attempt with email {command.Email}");


        }
    }
}