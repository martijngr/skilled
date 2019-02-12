namespace Skilled.CQRS
{
    public interface ICommandHandler<T>
    {
        void Handle(T command);
    }
}