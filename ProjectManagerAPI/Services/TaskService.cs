using System.Linq;
using System.Threading.Tasks;
using ProjectManagerAPI.Data;
using ProjectManagerAPI.DTOs;
using ProjectManagerAPI.Models;

namespace ProjectManagerAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly IDataStore _dataStore;

        public TaskService(IDataStore dataStore)
        {
            _dataStore = dataStore;
        }

        public async Task<TaskItem> AddTaskToProject(int projectId, TaskItemDto taskDto, int userId)
        {
            var project = _dataStore.Projects.FirstOrDefault(p => p.Id == projectId && p.UserId == userId);
            if (project == null)
            {
                return null; 
            }

            var newTask = new TaskItem
            {
                Id = _dataStore.Tasks.Any() ? _dataStore.Tasks.Max(t => t.Id) + 1 : 1,
                Title = taskDto.Title,
                DueDate = taskDto.DueDate,
                IsCompleted = taskDto.IsCompleted,
                ProjectId = projectId
            };

            _dataStore.Tasks.Add(newTask);
            project.Tasks.Add(newTask);
            return newTask;
        }

        public async Task<TaskItem> UpdateTask(int taskId, TaskItemDto taskDto, int userId)
        {
            var taskToUpdate = _dataStore.Tasks.FirstOrDefault(t => t.Id == taskId);
            if (taskToUpdate == null)
            {
                return null; 
            }

            var project = _dataStore.Projects.FirstOrDefault(p => p.Id == taskToUpdate.ProjectId && p.UserId == userId);
            if (project == null)
            {
                return null; 
            }

            taskToUpdate.Title = taskDto.Title;
            taskToUpdate.DueDate = taskDto.DueDate;
            taskToUpdate.IsCompleted = taskDto.IsCompleted;

            return taskToUpdate;
        }

        public async Task<bool> DeleteTask(int taskId, int userId)
        {
            var taskToRemove = _dataStore.Tasks.FirstOrDefault(t => t.Id == taskId);
            if (taskToRemove == null)
            {
                return false; 
            }

            var project = _dataStore.Projects.FirstOrDefault(p => p.Id == taskToRemove.ProjectId && p.UserId == userId);
            if (project == null)
            {
                return false; 
            }

            _dataStore.Tasks.Remove(taskToRemove);
            project.Tasks.Remove(taskToRemove);
            return true;
        }

        public async Task<TaskItem> GetTaskById(int taskId, int userId)
        {
            var task = _dataStore.Tasks.FirstOrDefault(t => t.Id == taskId);
            if (task == null)
            {
                return null;
            }

            var project = _dataStore.Projects.FirstOrDefault(p => p.Id == task.ProjectId && p.UserId == userId);
            if (project == null)
            {
                return null; 
            }

            return task;
        }
    }
}
