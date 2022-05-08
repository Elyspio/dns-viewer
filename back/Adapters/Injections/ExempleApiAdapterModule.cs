using DnsViewer.Api.Abstractions.Interfaces.Injections;
using DnsViewer.Api.Adapters.Configs;
using DnsViewer.Api.Adapters.AuthenticationApi;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DnsViewer.Api.Adapters.Injections;

public class DnsViewApiAdapterModule : IDotnetModule
{
    public void Load(IServiceCollection services, IConfiguration configuration)
    {
        var conf = new EndpointConfig();
        configuration.GetSection(EndpointConfig.Section).Bind(conf);

        services.AddHttpClient<IUsersClient, UsersClient>(client => { client.BaseAddress = new Uri(conf.Authentication); });

        services.AddHttpClient<IAuthenticationClient, AuthenticationClient>(client => { client.BaseAddress = new Uri(conf.Authentication); });
    }
}