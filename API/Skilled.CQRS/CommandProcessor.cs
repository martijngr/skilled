namespace Skilled.CQRS
{
    public class CommandProcessor
    {
        private readonly ITypeResolver _typeResolver;

        public CommandProcessor(ITypeResolver typeResolver)
        {
            _typeResolver = typeResolver;
        }

        public CommandResult Handle(object command)
        {
            var handlerType = typeof(ICommandHandler<>).MakeGenericType(command.GetType());
            dynamic handler = _typeResolver.GetType(handlerType);

            var result = handler.Handle((dynamic)command);

            return result;
        }
        public CommandResult<T> Handle<T>(ICommand<T> command)
        {
            var handlerType = typeof(ICommandHandler<,>).MakeGenericType(command.GetType(), typeof(T));
            dynamic handler = _typeResolver.GetType(handlerType);

            var result = handler.Handle((dynamic)command);

            return result;
        }
    }
}
