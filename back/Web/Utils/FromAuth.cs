namespace DnsViewer.Api.Web.Utils;

public static class AuthUtility
{
    internal static readonly string UsernameField = "auth_username";

    internal static readonly string TokenField = "auth_token";

    public static string GetUsername(HttpRequest request)
    {
        return request.Headers[UsernameField].First();
    }

    public static string GetToken(HttpRequest request)
    {
        return request.Headers[TokenField].First();
    }
}