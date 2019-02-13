using Skilled.Domain.Settings;
using System;
using System.Configuration;
using System.Web;
using System.Web.Mvc;

namespace Skilled.Api.Settings
{
    public class AppSettings : IAppSettings
    {
        public string BaseFileLocation => ConfigurationManager.AppSettings["BaseFileLocation"];
    }
}