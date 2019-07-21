using Skilled.Business.Core;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Infrastructure
{
    public class BaseRepository<T> : IRepository<T> where T:class
    {
        private readonly SkilledContext _context;

        public BaseRepository(SkilledContext context)
        {
            _context = context;
        }

        public IQueryable<T> All => _context.Set<T>();

        public void Add(T item)
        {
            _context.Set<T>().Add(item);
        }

        public void Add(IEnumerable<T> items)
        {
            _context.Set<T>().AddRange(items);
        }

        public void Delete(T item)
        {
            _context.Set<T>().Remove(item);
        }
    }
}
