namespace Skilled.Domain.PathHandling
{
    public interface IPathResolver
    {
        string GetEmployerRootPath(int employerId);

        string GetContactPersonRootPath(int employerId);
    }
}