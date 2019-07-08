namespace Skilled.CQRS
{
    public interface ICommandHandler<T, TResult>
    {
        CommandResult<TResult> Handle(T command);
    }
}