using System.Linq;

namespace Skilled.Business
{
    public static class StringExtensions
    {
        public static string NewlinesToHtmlBrs(this string value)
        {
            return value.Replace("\r\n", "<br/>");
        }

        public static int ToInt(this string value)
        {
            return int.Parse(value);
        }

        public static string CombineUrl(this string value, params string[] parts)
        {
            var start = value.TrimEnd('/');
            return parts.Aggregate(value, (a, b) => $"{a}/{b}");
        }
    }
}
