using DnsViewer.Api.Abstractions.Interfaces.Injections;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DnsViewer.Api.Core.Injections;

public class DnsViewApiCoreModule : IDotnetModule
{
    public void Load(IServiceCollection services, IConfiguration configuration)
    {
        var nsp = typeof(DnsViewApiCoreModule).Namespace!;
        var baseNamespace = nsp[..nsp.LastIndexOf(".")];
        services.Scan(scan => scan
            .FromAssemblyOf<DnsViewApiCoreModule>()
            .AddClasses(classes => classes.InNamespaces(baseNamespace + ".Services"))
            .AsImplementedInterfaces()
            .WithSingletonLifetime()
        );
    }
}