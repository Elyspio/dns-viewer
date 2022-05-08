using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Example.Api.Web.Filters;
using Example.Api.Web.Utils;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Example.Api.Web.Controllers
{
	[Route("api/todo")]
	[ApiController]
	public class TodoController : ControllerBase
	{
		private readonly ITodoService todoService;

		public TodoController(ITodoService todoService)
		{
			this.todoService = todoService;
		}

		[HttpGet]
		[SwaggerResponse(200, type: typeof(List<Todo>))]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await todoService.GetAll());
		}

		[HttpPut("{id:guid}/toggle")]
		[SwaggerResponse(200, type: typeof(Todo))]
		public async Task<IActionResult> Check(Guid id)
		{
			return Ok(await todoService.Check(id));
		}


		[RequireAuth]
		[HttpPost]
		[SwaggerResponse(200, type: typeof(Todo))]
		public async Task<IActionResult> Add(string label)
		{
			return Ok(await todoService.Add(label));
		}

		[RequireAuth]
		[HttpDelete("{id:guid}")]
		[SwaggerResponse(204)]
		public async Task<IActionResult> Delete(Guid id)
		{
			await todoService.Delete(id);
			return NoContent();
		}


		[RequireAuth]
		[HttpDelete("user/{id:guid}")]
		[SwaggerResponse(204)]
		public async Task<IActionResult> DeleteForUser(Guid id)
		{
			await todoService.DeleteForUser(id, AuthUtility.GetUsername(Request));
			return NoContent();
		}


		[RequireAuth]
		[HttpPost("user")]
		[SwaggerResponse(201, type: typeof(Todo))]
		public async Task<IActionResult> AddForUser(string label)
		{
			var todo = await todoService.AddForUser(label, AuthUtility.GetUsername(Request));
			return Created($"/{todo.Id}", todo);
		}


		[RequireAuth]
		[HttpGet("user")]
		[SwaggerResponse(200, type: typeof(List<Todo>))]
		public async Task<IActionResult> GetAllForUser()
		{
			var user = AuthUtility.GetUsername(Request);
			return Ok(await todoService.GetAllForUser(user));
		}


		[RequireAuth]
		[HttpPut("user/{id:guid}/toggle")]
		[SwaggerResponse(200, type: typeof(Todo))]
		public async Task<IActionResult> CheckForUser(Guid id)
		{
			return Ok(await todoService.CheckForUser(id, AuthUtility.GetUsername(Request)));
		}
	}
}