using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.Domain.PathHandling
{
    public interface IPathResolver
    {
        string GetVacancyRootPath(int employerId);
    }
}