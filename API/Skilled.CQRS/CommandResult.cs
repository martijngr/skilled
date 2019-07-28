using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skilled.CQRS
{
    public class CommandResult<T>
    {
        public CommandResult(bool success)
        {
            Success = success;
        }

        public CommandResult(bool success, T result)
        {
            Success = success;
            Result = result;
        }

        public bool Success { get; }

        public T Result { get; }
    }

    public class CommandSuccessResult<T> : CommandResult<T>
    {
        public CommandSuccessResult(T result)
            : base(true, result)
        { }
    }

    public class CommandFailedResult<T> : CommandResult<T>
    {
        public CommandFailedResult(string message)
            : base(false)
        {
            Message = message;
        }

        public string Message { get; }
    }

    public abstract class CommandResult
    {
        public CommandResult(bool success)
        {
            Success = success;
        }
        public bool Success { get; }
    }

    public class CommandSuccessResult : CommandResult
    {
        public CommandSuccessResult()
            : base(true)
        {
        }
    }

    public class CommandFailedResult : CommandResult
    {
        public CommandFailedResult(string message)
            : base(false)
        {
            Message = message;
        }

        public string Message { get; }
    }
}
