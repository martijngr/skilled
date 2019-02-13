namespace Skilled.CQRS
{
    public class CommandProcessor
    {
        private readonly ITypeResolver _typeResolver;

        public CommandProcessor(ITypeResolver typeResolver)
        {
            _typeResolver = typeResolver;
        }

        public void Handle(object command)
        {
            var handlerType = typeof(ICommandHandler<>).MakeGenericType(command.GetType());
            dynamic handler = _typeResolver.GetType(handlerType);

            handler.Handle((dynamic)command);
        }
    }
}
