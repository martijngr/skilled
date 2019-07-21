using System.Collections.Generic;
using System.Linq;

namespace Skilled.Business.Core
{
    public interface IRepository<T>
    {
        void Add(T item);

        void Add(IEnumerable<T> items);

        void Delete(T item);

        IQueryable<T> All { get; }
    }
}
