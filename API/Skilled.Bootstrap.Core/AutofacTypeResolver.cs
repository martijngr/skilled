using Autofac;
using Skilled.CQRS;
using System;

namespace Skilled.Bootstrap
{
    public class AutofacTypeResolver : ITypeResolver
    {
        private readonly IComponentContext _container;
        public AutofacTypeResolver(IComponentContext container)
        {
            _container = container;
        }

        public object GetType(Type entity)
        {
            return _container.Resolve(entity);
        }
    }
}