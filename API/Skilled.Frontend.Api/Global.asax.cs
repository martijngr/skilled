using Autofac;
using Autofac.Integration.WebApi;
using Skilled.Api.Settings;
using Skilled.Bootstrap;
using Skilled.Domain.Settings;
using Skilled.Frontend.Api.Models.Vacancies;
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
        }
    }
}
