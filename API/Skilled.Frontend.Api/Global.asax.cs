using Autofac;
using Autofac.Integration.WebApi;
using Skilled.Api.Settings;
using Skilled.Bootstrap;
using Skilled.Domain.Settings;
using System;
using System.Reflection;
using System.Web.Http;

namespace Skilled.Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //AreaRegistration.RegisterAllAreas();
            //GlobalConfiguration.Configure(WebApiConfig.Register);
            // FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);

            // RegisterAutofac();
        }

        private void RegisterAutofac()
        {
            var builder = new ContainerBuilder();

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // OPTIONAL: Register the Autofac filter provider.
            //builder.RegisterWebApiFilterProvider(config);

            // OPTIONAL: Register the Autofac model binder provider.
            //builder.RegisterWebApiModelBinderProvider();

            var assemblies = AppDomain.CurrentDomain.GetAssemblies();

            builder.RegisterType<AppSettings>().As<IAppSettings>();

            // Set the dependency resolver to be Autofac.
            FrontendBootstrapper.Bootstrap(builder, assemblies);

            var container = builder.Build();
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}
