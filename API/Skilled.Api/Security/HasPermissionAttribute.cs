using Autofac;
using Autofac.Integration.Owin;
using Skilled.CQRS;
using Skilled.Domain;
using Skilled.Domain.Security.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Skilled.Api.Security
{
    public class HasPermissionAttribute : AuthorizeAttribute
    {
        private readonly string _permission;

        public HasPermissionAttribute(string permission)
        {
            _permission = permission;
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var lifetimeScope = OwinContextExtensions.GetAutofacLifetimeScope(HttpContext.Current.GetOwinContext());
            var queryProcessor = lifetimeScope.Resolve<QueryProcessor>();

            var principal = actionContext.RequestContext.Principal as ClaimsPrincipal;
            var employeeGroupId = principal
                            .Claims
                            .Where(c => c.Type == ClaimTypes.Role)
                            .Select(c => c.Value)
                            .DefaultIfEmpty("0")
                            .FirstOrDefault()
                            .ToInt();

            queryProcessor.Handle(new HasEmployeeGroupPermissionQuery(employeeGroupId, _permission));

            return base.IsAuthorized(actionContext);
        }
    }
}