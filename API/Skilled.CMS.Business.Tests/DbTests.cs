using Microsoft.VisualStudio.TestTools.UnitTesting;
using Skilled.Domain.Employees;
using Skilled.Infrastructure;
using System.Linq;

namespace Skilled.Domain.Tests
{
    [TestClass]
    public class DbTests
    {
        [TestMethod]
        public void TestMethod1()
        {
            // Given
            var context = new SkilledContext();
            var employeeRepo = new BaseRepository<Employee>(context);

            // When
            var employee = employeeRepo.All.FirstOrDefault();

            // Then
            Assert.AreNotEqual(employee, null);
        }
    }
}
