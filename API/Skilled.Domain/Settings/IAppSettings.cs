using System;

namespace Skilled.Domain.Settings
{
    public interface IAppSettings
    {
        string BaseFileLocation { get; }
    }
}