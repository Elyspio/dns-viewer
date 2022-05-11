using DnsViewer.Api.Abstractions.Transports;

namespace DnsViewer.Api.Abstractions.Interfaces.Services;

public interface IDnsService
{
    Task<DnsEntry> Add(string host, string ip, string token);
    Task<List<DnsEntry>> GetAll();
    Task Delete(string host, string token);
}