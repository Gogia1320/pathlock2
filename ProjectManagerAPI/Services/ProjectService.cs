using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectManagerAPI.Data;
using ProjectManagerAPI.DTOs;
using ProjectManagerAPI.Models;

namespace ProjectManagerAPI.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IDataStore _dataStore;

        public ProjectService(IDataStore dataStore)
        {
            _dataStore = dataStore;
        }

        public async Task<List<Project>> GetProjectsByUserId(int userId)
        {
            return _dataStore.Projects.Where(p => p.UserId == userId).ToList();
        }

        public async Task<Project> GetProjectById(int projectId, int userId)
        {
            return _dataStore.Projects.FirstOrDefault(p => p.Id == projectId && p.UserId == userId);
        }

        public async Task<Project> AddProject(ProjectDto projectDto, int userId)
        {
            var newProject = new Project
            {
                Id = _dataStore.Projects.Any() ? _dataStore.Projects.Max(p => p.Id) + 1 : 1,
                Title = projectDto.Title,
                Description = projectDto.Description,
                CreatedAt = DateTime.UtcNow,
                UserId = userId
            };

            _dataStore.Projects.Add(newProject);
            return newProject;
        }

        public async Task<bool> DeleteProject(int projectId, int userId)
        {
            var projectToRemove = _dataStore.Projects.FirstOrDefault(p => p.Id == projectId && p.UserId == userId);
            if (projectToRemove == null)
            {
                return false;
            }

            // Remove associated tasks first
            _dataStore.Tasks.RemoveAll(t => t.ProjectId == projectId);
            _dataStore.Projects.Remove(projectToRemove);
            return true;
        }
    }
}
