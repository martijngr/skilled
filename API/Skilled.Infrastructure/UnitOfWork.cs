using Skilled.Domain;
using Skilled.Domain.Skills;
using Skilled.Domain.ThinkLevels;
using Skilled.Domain.Vacancies;
using Skilled.Domain.Zipcodes;

namespace Skilled.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SkilledContext _context;

        public UnitOfWork(SkilledContext context)
        {
            _context = context;

            Vacancies = new BaseRepository<Vacancy>(context);
            Skills = new BaseRepository<Skill>(context);
            ThinkLevels = new BaseRepository<ThinkLevel>(context);
            Zipcodes = new BaseRepository<Zipcode>(context);
            ZipcodeDistances = new BaseRepository<ZipcodeDistance>(context);
        }

        public IRepository<Vacancy> Vacancies { get; }

        public IRepository<Skill> Skills { get; }

        public IRepository<ThinkLevel> ThinkLevels { get; }

        public IRepository<Zipcode> Zipcodes { get; }

        public IRepository<ZipcodeDistance> ZipcodeDistances { get; }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}