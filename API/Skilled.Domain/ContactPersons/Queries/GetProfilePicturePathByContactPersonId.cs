using Skilled.CQRS;
using Skilled.Domain.PathHandling;
using System;
using System.IO;
using System.Linq;

namespace Skilled.Domain.ContactPersons.Queries
{
    public class GetProfilePicturePathByContactPersonId : IQuery<string>
    {
        public GetProfilePicturePathByContactPersonId(int contactPersonId)
        {
            ContactPersonId = contactPersonId;
        }

        public int ContactPersonId { get; private set; }
    }

    public class GetProfilePicturePathByContactPersonIdQueryHandler : IQueryHandler<GetProfilePicturePathByContactPersonId, string>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPathResolver _pathResolver;

        public GetProfilePicturePathByContactPersonIdQueryHandler(IUnitOfWork unitOfWork, IPathResolver pathResolver)
        {
            _unitOfWork = unitOfWork;
            _pathResolver = pathResolver;
        }

        public string Handle(GetProfilePicturePathByContactPersonId query)
        {
            var contactPerson = _unitOfWork.ContactPersons.All.FirstOrDefault(c => c.Id == query.ContactPersonId);

            if (contactPerson == null)
                throw new ArgumentException($"No contactperson found with id {query.ContactPersonId}");

            var path = Path.Combine(_pathResolver.GetContactPersonRootPath(contactPerson.Employer.Id), contactPerson.ProfilePictureName);

            if (File.Exists(path))
                return path;

            throw new FileNotFoundException($"No profile picture found for contactperson with id {contactPerson.Id} with filename '{path}'");
        }
    }
}
