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
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly ITaskService _taskService;

        public ProjectsController(IProjectService projectService, ITaskService taskService)
        {
            _projectService = projectService;
            _taskService = taskService;
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                return userId;
            }
            throw new UnauthorizedAccessException("User ID not found in token.");
        }

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var userId = GetUserId();
            var projects = await _projectService.GetProjectsByUserId(userId);
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var userId = GetUserId();
            var project = await _projectService.GetProjectById(id, userId);

            if (project == null)
            {
                return NotFound();
            }

            var projectDetailsDto = new ProjectDetailsDto
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                CreatedAt = project.CreatedAt,
                Tasks = project.Tasks.Select(t => new TaskItemDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    DueDate = t.DueDate,
                    IsCompleted = t.IsCompleted
                }).ToList()
            };

            return Ok(projectDetailsDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddProject([FromBody] ProjectDto projectDto)
        {
            var userId = GetUserId();
            var newProject = await _projectService.AddProject(projectDto, userId);
            return CreatedAtAction(nameof(GetProject), new { id = newProject.Id }, newProject);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var userId = GetUserId();
            var result = await _projectService.DeleteProject(id, userId);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost("{projectId}/tasks")]
        public async Task<IActionResult> AddTaskToProject(int projectId, [FromBody] TaskItemDto taskDto)
        {
            var userId = GetUserId();
            var newTask = await _taskService.AddTaskToProject(projectId, taskDto, userId);
            if (newTask == null)
            {
                return BadRequest("Project not found or unauthorized.");
            }
            return CreatedAtAction(nameof(GetProject), new { id = projectId }, newTask);
        }
    }
}
