using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectManagerAPI.DTOs;
using ProjectManagerAPI.Services;

namespace ProjectManagerAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        private int GetUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("id");
            if (claim != null && int.TryParse(claim.Value, out int userId))
            {
                return userId;
            }
            throw new UnauthorizedAccessException("User ID not found in token.");
        }


        [HttpPut("{taskId}")]
        public async Task<IActionResult> UpdateTask(int taskId, [FromBody] TaskItemDto taskDto)
        {
            var userId = GetUserId();
            var updatedTask = await _taskService.UpdateTask(taskId, taskDto, userId);
            if (updatedTask == null)
            {
                return NotFound("Task not found or unauthorized.");
            }
            return Ok(updatedTask);
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTask(int taskId)
        {
            var userId = GetUserId();
            var result = await _taskService.DeleteTask(taskId, userId);
            if (!result)
            {
                return NotFound("Task not found or unauthorized.");
            }
            return NoContent();
        }
    }
}
