using Skilled.CQRS;
using Skilled.Domain.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.Domain.Employees.Commands
{
    public class LoginEmployeeCommand : ICommand<int>
    {
        public LoginEmployeeCommand(string email, string password)
        {
            Email = email;
            Password = password;
        }

        public string Email { get; }

        public string Password { get; set; }
    }

    public class LoginEmployeeCommandHandler : ICommandHandler<LoginEmployeeCommand, int>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PasswordEncryptor _passwordEncryptor;

        public LoginEmployeeCommandHandler(IUnitOfWork unitOfWork, PasswordEncryptor passwordEncryptor)
        {
            _unitOfWork = unitOfWork;
            _passwordEncryptor = passwordEncryptor;
        }

        public CommandResult<int> Handle(LoginEmployeeCommand command)
        {
            var employee = _unitOfWork.Employees.All.FirstOrDefault(e => e.Email == command.Email);

            if (employee == null)
                return new CommandFailedResult<int>($"Invalid login attempt with email {command.Email}");

            if (!_passwordEncryptor.ComparePasswords(command.Password, employee.Password))
                return new CommandFailedResult<int>($"Invalid login attempt with email {command.Email}");

            return new CommandSuccessResult<int>(56);
        }
    }
}