using Autofac;
using Skilled.Business.Core;
using Skilled.Infrastructure;
using System.Reflection;

namespace Skilled.Bootstrap
{
    public class CmsBootstrapper
    {
        public static void Bootstrap(ContainerBuilder builder, Assembly[] assemblies)
        {
            CoreBootstrapper.Bootstrap(builder, assemblies);

            builder.RegisterType<CmsUnitOfWork>().As<IUnitOfWork>();
        }
    }
}
