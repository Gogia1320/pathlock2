using System.Collections.Generic;
using System.Threading.Tasks;
using ProjectManagerAPI.DTOs;
using ProjectManagerAPI.Models;

namespace ProjectManagerAPI.Services
{
    public interface IProjectService
    {
        Task<List<Project>> GetProjectsByUserId(int userId);
        Task<Project> GetProjectById(int projectId, int userId);
        Task<Project> AddProject(ProjectDto projectDto, int userId);
        Task<bool> DeleteProject(int projectId, int userId);
    }
}
