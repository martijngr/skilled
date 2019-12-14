using Skilled.Domain.Settings;
using System.Configuration;

namespace Skilled.Api.Settings
{
    public class AppSettings : IAppSettings
    {
        public string BaseFileLocation => ConfigurationManager.AppSettings["BaseFileLocation"];

        public string MediaUrl => ConfigurationManager.AppSettings["MediaUrl"];
    }
}