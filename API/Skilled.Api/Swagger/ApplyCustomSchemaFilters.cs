using Swashbuckle.Swagger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skilled.Api.Swagger
{
    public class ApplyCustomSchemaFilters : ISchemaFilter
    {
        public void Apply(Schema schema, SchemaRegistry schemaRegistry, Type type)
        {
            var excludeProperties = new[] { "query" };

            foreach (var prop in excludeProperties)
                if (schema.properties.ContainsKey(prop))
                    schema.properties.Remove(prop);
        }
    }
}