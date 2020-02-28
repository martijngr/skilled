using Autofac;
using Skilled.Business.Core;
using Skilled.Frontend.Business.Vacancies;
using Skilled.Infrastructure;
using System.Reflection;

namespace Skilled.Bootstrap
{
    public class FrontendBootstrapper
    {
        public static void Bootstrap(ContainerBuilder builder, Assembly[] assemblies)
        {
            CoreBootstrapper.Bootstrap(builder, assemblies);

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
            builder.RegisterType<VacancyMatchCalculator>().As<VacancyMatchCalculator>();
        }
    }
}
