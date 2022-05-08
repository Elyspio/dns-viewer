using System.ComponentModel.DataAnnotations;

namespace DnsViewer.Api.Abstractions.Transports;

public class DnsEntry
{
    [Required] public string Ip { get; init; }
        
    [Required] public string Host { get; init; }
}