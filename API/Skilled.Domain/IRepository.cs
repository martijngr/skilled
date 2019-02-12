using System.Collections.Generic;
using System.Linq;

namespace Skilled.Domain
{
    public interface IRepository<T>
    {
        void Add(T item);

        void Add(IEnumerable<T> items);

        void Delete(T item);

        IQueryable<T> All { get; }
    }
}
