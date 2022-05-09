using DnsViewer.Api.Abstractions.Interfaces.Services;
using DnsViewer.Api.Abstractions.Transports;
using DnsViewer.Api.Web.Filters;
using DnsViewer.Api.Web.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace DnsViewer.Api.Web.Controllers;

[Route("api/dns-entries")]
[RequireAuth]
[ApiController]
public class DnsController : ControllerBase
{
    private readonly IDnsService dnsService;

    public DnsController(IDnsService dnsService)
    {
        this.dnsService = dnsService;
    }

    [HttpGet]
    [SwaggerResponse(200, type: typeof(List<DnsEntry>))]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await dnsService.GetAll());
    }


    [HttpPost]
    [SwaggerResponse(201, type: typeof(DnsEntry))]
    public async Task<IActionResult> Add(AddEntry payload)
    {
        return Created($"{payload.Host}", await dnsService.Add(payload.Host, payload.Ip));
    }

    [HttpDelete("{host}")]
    [SwaggerResponse(204)]
    public async Task<IActionResult> Delete(string host)
    {
        await dnsService.Delete(host);
        return NoContent();
    }
}