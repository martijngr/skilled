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
    }
}
