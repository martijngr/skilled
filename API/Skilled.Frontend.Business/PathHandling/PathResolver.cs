using Skilled.Domain.Settings;
using System.IO;

namespace Skilled.Domain.PathHandling
{
    public class PathResolver : IPathResolver
    {
        private readonly IAppSettings _settings;

        public PathResolver(IAppSettings settings)
        {
            _settings = settings;
        }

        public string GetEmployerRootPath(int employerId)
        {
            return Path.Combine(GetRoot(), employerId.ToString());
        }

        public string GetContactPersonRootPath(int employerId)
        {
            return Path.Combine(GetRoot(), employerId.ToString(), "ContactPersons");
        }

        private string GetRoot()
        {
            return Path.Combine(_settings.BaseFileLocation, "Employers");
        }
    }
}
