﻿using Autofac;
using Autofac.Integration.WebApi;
using Skilled.Api.Settings;
using Skilled.CQRS;
using Skilled.Domain.Settings;
using System;
using System.Linq;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;

namespace Skilled.Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);

            RegisterAutofac();
        }

        private void RegisterAutofac()
        {
            var builder = new ContainerBuilder();

            // Get your HttpConfiguration.
            var config = GlobalConfiguration.Configuration;

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // OPTIONAL: Register the Autofac filter provider.
            //builder.RegisterWebApiFilterProvider(config);

            // OPTIONAL: Register the Autofac model binder provider.
            //builder.RegisterWebApiModelBinderProvider();

            var assemblies = AppDomain.CurrentDomain.GetAssemblies();

            builder.RegisterAssemblyTypes(assemblies)
                    .As(type => type.GetInterfaces()
                    .Where(interfaceType => interfaceType.IsClosedTypeOf(typeof(IQueryHandler<,>))));

            builder.RegisterAssemblyTypes(assemblies)
                    .As(type => type.GetInterfaces()
                    .Where(interfaceType => interfaceType.IsClosedTypeOf(typeof(ICommandHandler<>))));
            //.Select(interfaceType => new KeyedService("commandHandler", interfaceType)));

            builder.RegisterType<AppSettings>().As<IAppSettings>();

            // Set the dependency resolver to be Autofac.
            Bootstrap.Bootstrapper.Bootstrap(builder);

            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}
