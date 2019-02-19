using Autofac;
using Skilled.CQRS;
using Skilled.Domain;
using Skilled.Domain.DistanceCalculators;
using Skilled.Domain.DistanceCalculators.Google;
using Skilled.Domain.PathHandling;
using Skilled.Domain.Vacancies.Searching;
using Skilled.Infrastructure;
using System.Linq;
using System.Reflection;

namespace Skilled.Bootstrap
{
    public class Bootstrapper
    {
        public static void Bootstrap(ContainerBuilder builder, Assembly[] assemblies)
        {
            builder.RegisterAssemblyTypes(assemblies)
                    .As(type => type.GetInterfaces()
                    .Where(interfaceType => interfaceType.IsClosedTypeOf(typeof(IQueryHandler<,>))));

            builder.RegisterAssemblyTypes(assemblies)
                    .As(type => type.GetInterfaces()
                    .Where(interfaceType => interfaceType.IsClosedTypeOf(typeof(ICommandHandler<>))));
                    //.Select(interfaceType => new KeyedService("commandHandler", interfaceType)));

            //builder.RegisterGenericDecorator(typeof(LoggingCommandDecorator<>),
            //                                 typeof(ICommandHandler<>),
            //                                 "commandHandler", "profilingHandler");
            //builder.RegisterGenericDecorator(typeof(ProfilingCommandDecorator<>),
            //                                 typeof(ICommandHandler<>),
            //                                 "profilingHandler");

            builder.RegisterType<QueryProcessor>().AsSelf();
            builder.RegisterType<CommandProcessor>().AsSelf();

            builder.RegisterType<AutofacTypeResolver>().As<ITypeResolver>();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
            builder.RegisterType<SkilledContext>().AsSelf().InstancePerRequest();

            builder.RegisterType<GoogleDistanceCalculator>().Named<IDistanceCalculator>("google");
            builder.RegisterDecorator<IDistanceCalculator>((c, inner) => new DbDistanceCalculatorDecorator(inner, c.Resolve<IUnitOfWork>()), fromKey: "google");

            builder.RegisterType<VancancySearcher>().AsSelf();
            builder.RegisterType<PathResolver>().As<IPathResolver>();
        }
    }
}
