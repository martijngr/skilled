using System;

namespace Skilled.CQRS
{
    public interface ITypeResolver
    {
        object GetType(Type entity);
    }
}
