using System.Collections.Generic;
using System.Threading.Tasks;
using ProjectManagerAPI.DTOs;
using ProjectManagerAPI.Models;

namespace ProjectManagerAPI.Services
{
    public interface ITaskService
    {
        Task<TaskItem> AddTaskToProject(int projectId, TaskItemDto taskDto, int userId);
        Task<TaskItem> UpdateTask(int taskId, TaskItemDto taskDto, int userId);
        Task<bool> DeleteTask(int taskId, int userId);
        Task<TaskItem> GetTaskById(int taskId, int userId);
    }
}
