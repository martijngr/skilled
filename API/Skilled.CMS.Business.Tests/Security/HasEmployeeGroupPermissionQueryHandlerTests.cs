using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Skilled.Business.Core;
using Skilled.CMS.Business.EmployeeGroups.Queries;
using Skilled.Domain.Permissions;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Domain.Tests.Security
{
    public class PermissionListBuilder
    {
        private List<Permission> _permissions;
        int _idCounter;

        public PermissionListBuilder()
        {
            _permissions = new List<Permission>();
            _idCounter = 1;
        }

        public PermissionListBuilder WithReadPermission()
        {
            _permissions.Add(new Permission { Id = _idCounter, Name = "vacancy_read" });
            _idCounter ++;

            return this;
        }

        public PermissionListBuilder WithWritePermission()
        {
            _permissions.Add(new Permission { Id = _idCounter, Name = "vacancy_write" });
            _idCounter++;

            return this;
        }

        public PermissionListBuilder WithFullPermission()
        {
            _permissions.Add(new Permission { Id = _idCounter, Name = "vacancy_full" });
            _idCounter++;

            return this;
        }

        public ICollection<Permission> Build()
        {
            return _permissions;
        }
    }

    [TestClass]
    public class HasEmployeeGroupPermissionQueryHandlerTests
    {
        [TestMethod]
        public void Should_return_true_when_group_has_full_permission_and_requested_is_read()
        {
            // Given
            var employeeGroupId = 1;
            var unitOfWork = new Mock<IUnitOfWork>();
            var repo = new Mock<IRepository<EmployeeGroup>>();
            var permissions = new PermissionListBuilder().WithFullPermission().Build();

            repo.Setup(r => r.All).Returns((new[] {
                new EmployeeGroup{ Id = employeeGroupId, Permissions = permissions }
            }).AsQueryable());

            unitOfWork.Setup(u => u.EmployeeGroups).Returns(repo.Object);

            var queryHandler = new HasEmployeeGroupPermissionQueryHandler(unitOfWork.Object);

            // When
            var query = new HasEmployeeGroupPermissionQuery(1, "vacancy_read");
            var hasPermission = queryHandler.Handle(query);

            // Then
            Assert.AreEqual(true, hasPermission);
        }

        [TestMethod]
        public void Should_return_true_when_group_has_read_permission_and_requested_is_read()
        {
            // Given
            var employeeGroupId = 1;
            var unitOfWork = new Mock<IUnitOfWork>();
            var permissions = new PermissionListBuilder().WithReadPermission().Build();
            var repo = new Mock<IRepository<EmployeeGroup>>();
            repo.Setup(r => r.All).Returns((new[] {
                new EmployeeGroup{ Id = employeeGroupId, Permissions = permissions }
            }).AsQueryable());

            unitOfWork.Setup(u => u.EmployeeGroups).Returns(repo.Object);

            var queryHandler = new HasEmployeeGroupPermissionQueryHandler(unitOfWork.Object);

            // When
            var query = new HasEmployeeGroupPermissionQuery(1, "vacancy_read");
            var hasPermission = queryHandler.Handle(query);

            // Then
            Assert.AreEqual(true, hasPermission);
        }

        [TestMethod]
        public void Should_return_false_when_group_has_read_permission_and_requested_is_write()
        {
            // Given
            var employeeGroupId = 1;
            var unitOfWork = new Mock<IUnitOfWork>();
            var permissions = new PermissionListBuilder().WithReadPermission().Build();
            var repo = new Mock<IRepository<EmployeeGroup>>();
            repo.Setup(r => r.All).Returns((new[] {
                new EmployeeGroup{ Id = employeeGroupId, Permissions = permissions }
            }).AsQueryable());

            unitOfWork.Setup(u => u.EmployeeGroups).Returns(repo.Object);

            var queryHandler = new HasEmployeeGroupPermissionQueryHandler(unitOfWork.Object);

            // When
            var query = new HasEmployeeGroupPermissionQuery(1, "vacancy_write");
            var hasPermission = queryHandler.Handle(query);

            // Then
            Assert.AreEqual(false, hasPermission);
        }

        [TestMethod]
        public void Should_return_false_when_the_group_is_different_but_the_right_is_the_same()
        {
            // Given
            var employeeGroupId = 1;
            var unitOfWork = new Mock<IUnitOfWork>();
            var permissions = new PermissionListBuilder().WithReadPermission().Build();
            var repo = new Mock<IRepository<EmployeeGroup>>();
            repo.Setup(r => r.All).Returns((new[] {
                new EmployeeGroup{ Id = employeeGroupId, Permissions = permissions }
            }).AsQueryable());

            unitOfWork.Setup(u => u.EmployeeGroups).Returns(repo.Object);

            var queryHandler = new HasEmployeeGroupPermissionQueryHandler(unitOfWork.Object);

            // When
            var query = new HasEmployeeGroupPermissionQuery(1, "employee_read");
            var hasPermission = queryHandler.Handle(query);

            // Then
            Assert.AreEqual(false, hasPermission);
        }
    }
}
