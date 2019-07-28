namespace Skilled.CQRS
{
    public interface ICommandHandler<T>
    {
        CommandResult Handle(T command);
    }
}
