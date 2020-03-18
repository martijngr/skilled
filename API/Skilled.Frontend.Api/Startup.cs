using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Newtonsoft.Json.Serialization;
using Owin;
using Skilled.Api.Settings;
using Skilled.Bootstrap;
using Skilled.Domain.Settings;
using Skilled.Frontend.Api.Models.Vacancies;
using System;
using System.Net.Http.Headers;
using System.Reflection;
using System.Web.Http;

[assembly: OwinStartup(typeof(Skilled.Api.Startup))]

namespace Skilled.Api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var builder = new ContainerBuilder();
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();
            var config = new HttpConfiguration();

            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            //enable cors origin requests
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            // config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/octet-stream"));

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            // builder.RegisterWebApiFilterProvider(config); // using this prevents authorize filter from executing
            builder.RegisterType<AppSettings>().As<IAppSettings>();
            builder.RegisterType<VacancyDetailViewModelBuilder>();

            // Set the dependency resolver to be Autofac.
            FrontendBootstrapper.Bootstrap(builder, assemblies);

            var container = builder.Build();
            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(config);

            //var myProvider = new MyAuthorizationServerProvider();
            //OAuthAuthorizationServerOptions options = new OAuthAuthorizationServerOptions
            //{
            //    AllowInsecureHttp = true,
            //    TokenEndpointPath = new PathString("/token"),
            //    AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
            //    Provider = myProvider,
            //};
            // app.UseOAuthAuthorizationServer(options);
            // app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
            app.UseWebApi(config);
        }
    }

    //// http://www.dotnetawesome.com/2016/09/token-based-authentication-in-webapi.html
    //// https://www.youtube.com/watch?v=rMA69bVv0U8
    //public class MyAuthorizationServerProvider : OAuthAuthorizationServerProvider
    //{
    //    public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
    //    {
    //        context.Validated(); 
    //        await Task.CompletedTask;
    //    }

    //    public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
    //    {
    //        var lifetimeScope = OwinContextExtensions.GetAutofacLifetimeScope(context.OwinContext);
    //        var queryProcessor = lifetimeScope.Resolve<QueryProcessor>();
    //        var commandProcessor = lifetimeScope.Resolve<CommandProcessor>();
    //        await Task.CompletedTask;

    //        var loginCommand = new LoginEmployeeCommand(context.UserName, context.Password);
    //        var loginResult = commandProcessor.Handle(loginCommand);
    //        var identity = new ClaimsIdentity(context.Options.AuthenticationType);

    //        if (loginResult.Success)
    //        {
    //            identity.AddClaim(new Claim(ClaimTypes.Name, loginResult.Result.Name));
    //            identity.AddClaim(new Claim(ClaimTypes.Role, loginResult.Result.EmployeeGroupId.ToString()));

    //            context.Validated(identity);
    //        }
    //        else
    //        {
    //            context.SetError("invalid_grant", "Provided username and password are incorrect");
    //            return;
    //        }


           
    //        //if (context.UserName == "admin" && context.Password == "admin")
    //        //{
    //        //    identity.AddClaim(new Claim(ClaimTypes.Role, "admin"));
    //        //    identity.AddClaim(new Claim(ClaimTypes.Role, "admin2"));
    //        //    identity.AddClaim(new Claim("username", "admin"));
    //        //    identity.AddClaim(new Claim(ClaimTypes.Name, "Sourav Mondal"));
                
    //        //}
    //        //else if (context.UserName == "user" && context.Password == "user")
    //        //{
    //        //    identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
    //        //    identity.AddClaim(new Claim("username", "user"));
    //        //    identity.AddClaim(new Claim(ClaimTypes.Name, "Suresh Sha"));
    //        //    context.Validated(identity);
    //        //}
    //        //else
    //        //{
    //        //    context.SetError("invalid_grant", "Provided username and password is incorrect");
    //        //    return;
    //        //}
    //    }
    //}

    //public class AuthorizeAttribute : System.Web.Http.AuthorizeAttribute
    //{
    //    protected override void HandleUnauthorizedRequest(System.Web.Http.Controllers.HttpActionContext actionContext)
    //    {
    //        if (!HttpContext.Current.User.Identity.IsAuthenticated)
    //        {
    //            base.HandleUnauthorizedRequest(actionContext);
    //        }
    //        else
    //        {
    //            actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Forbidden);
    //        }
    //    }
    //}
}
