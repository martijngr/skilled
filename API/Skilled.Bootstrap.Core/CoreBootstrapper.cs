using Autofac;
using Skilled.Business;
using Skilled.Business.Core;
using Skilled.Business.Core.DistanceCalculators;
using Skilled.Business.Core.DistanceCalculators.Google;
using Skilled.Business.Core.Mailing.Clients;
using Skilled.Business.Core.Security.Cryptography;
using Skilled.Business.Frontend.Vacancies.Searching;
using Skilled.CMS.Business.Vacancies;
using Skilled.CQRS;
using Skilled.Domain.PathHandling;
using Skilled.Infrastructure;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Security.Principal;

namespace Skilled.Bootstrap
{
    public class CoreBootstrapper
    {
        public static void Bootstrap(ContainerBuilder builder, Assembly[] assemblies)
        {
            builder.RegisterAssemblyTypes(assemblies)
                    .As(type => type.GetInterfaces()
                    .Where(interfaceType => interfaceType.IsClosedTypeOf(typeof(IQueryHandler<,>))));

            builder.RegisterAssemblyTypes(assemblies)
                    .As(type => type.GetInterfaces()
                    .Where(interfaceType => interfaceType.IsClosedTypeOf(typeof(ICommandHandler<>))));
            builder.RegisterAssemblyTypes(assemblies)
                    .As(type => type.GetInterfaces()
                    .Where(interfaceType => interfaceType.IsClosedTypeOf(typeof(ICommandHandler<,>))));

            //.Select(interfaceType => new KeyedService("commandHandler", interfaceType)));

            //builder.RegisterGenericDecorator(typeof(LoggingCommandDecorator<>),
            //                                 typeof(ICommandHandler<>),
            //                                 "commandHandler", "profilingHandler");
            //builder.RegisterGenericDecorator(typeof(ProfilingCommandDecorator<>),
            //                                 typeof(ICommandHandler<>),
            //                                 "profilingHandler");

            builder.RegisterAssemblyTypes(assemblies)
                .Where(t => t.Name.EndsWith("Validator"))
                .AsImplementedInterfaces();
            
            builder.RegisterType<SkilledContext>().InstancePerRequest();

            builder.RegisterType<QueryProcessor>().AsSelf();
            builder.RegisterType<CommandProcessor>().AsSelf();

            builder.RegisterType<AutofacTypeResolver>().As<ITypeResolver>();
            builder.RegisterType<SmtpMailClient>().As<ISmtpClient>();
            builder.RegisterType<PasswordEncryptor>();

            builder.RegisterType<GoogleDistanceCalculator>().Named<IDistanceCalculator>("google");
            builder.RegisterDecorator<IDistanceCalculator>((c, inner) => new DbDistanceCalculatorDecorator(inner, c.Resolve<IUnitOfWork>()), fromKey: "google");
            builder.RegisterType<VancancySearcher>();
            builder.RegisterType<PathResolver>().As<IPathResolver>();
        }
    }
}
