﻿namespace Skilled.Domain
{
    public static class StringExtensions
    {
        public static string NewlinesToHtmlBrs(this string value)
        {
            return value.Replace("\r\n", "<br/>");
        }
    }
}