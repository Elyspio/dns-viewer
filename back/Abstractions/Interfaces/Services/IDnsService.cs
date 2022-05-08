using DnsViewer.Api.Abstractions.Transports;

namespace DnsViewer.Api.Abstractions.Interfaces.Services;

public interface IDnsService
{
    Task<DnsEntry> Add(string host, string ip);
    Task<List<DnsEntry>> GetAll();
    Task Delete(string host);
}