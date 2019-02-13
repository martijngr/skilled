namespace Skilled.CQRS
{
    public interface IQueryHandler<IQuery, ReturnType>
    {
        ReturnType Handle(IQuery query);
    }
}
