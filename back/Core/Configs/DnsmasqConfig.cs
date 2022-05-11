namespace DnsViewer.Api.Adapters.Configs;

public class DnsmasqConfig
{
    public const string Section = "Dnsmasq";
    public string ConfigPath { get; init; } = null!;
    public bool Reload { get; init; }


}