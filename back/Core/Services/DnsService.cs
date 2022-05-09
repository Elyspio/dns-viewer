using System.Text;
using DnsViewer.Api.Abstractions.Interfaces.Services;
using DnsViewer.Api.Abstractions.Transports;
using DnsViewer.Api.Adapters.Configs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace DnsViewer.Api.Core.Services;

public class DnsService : IDnsService
{
    private readonly List<DnsEntry> cache;
    private readonly DnsmasqConfig config;
    private readonly ILogger<DnsService> logger;

    public DnsService(ILogger<DnsService> logger, IConfiguration configuration)
    {
        this.logger = logger;
        config = new DnsmasqConfig();
        cache = new List<DnsEntry>();
        configuration.GetSection(DnsmasqConfig.Section).Bind(config);
        Read().GetAwaiter().GetResult();
    }


    public async Task<DnsEntry> Add(string host, string ip)
    {
        var dnsEntry = new DnsEntry {Host = host, Ip = ip};
        cache.Add(dnsEntry);
        await Write();
        return dnsEntry;
    }

    public async Task<List<DnsEntry>> GetAll()
    {
        return await Task.FromResult(cache);
    }

    public async Task Delete(string host)
    {
        cache.RemoveAt(cache.FindIndex(entry => entry.Host == host));
        await Write();
    }


    private async Task Read()
    {
        var data = new List<DnsEntry>();
        var lines = await File.ReadAllLinesAsync(config.ConfigPath);
        foreach (var line in lines)
        {
            var parts = line.Split('/');
            if (parts.Length == 3)
            {
                var entry = new DnsEntry {Host = parts[1], Ip = parts[2]};
                data.Add(entry);
            }
        }

        cache.Clear();
        cache.AddRange(data);
    }

    private async Task Write()
    {
        var str = new StringBuilder();
        cache.ForEach(entry => { str.AppendLine($"address=/{entry.Host}/{entry.Ip}"); });
        await File.WriteAllTextAsync(config.ConfigPath, str.ToString());
    }
}