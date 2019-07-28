using FluentValidation.Results;
using System.Collections.Generic;
using System.Linq;

namespace Skilled.Business
{
    public static class ValidationFailureExtensions
    {
        public static string ConvertToString(this IEnumerable<ValidationFailure> errors)
        {
            return string.Join(", ", errors.Select(e => e.ErrorMessage));
        }
    }
}
