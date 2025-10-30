using ProjectManagerAPI.Models;
using System.Collections.Generic;

namespace ProjectManagerAPI.Data
{
    public interface IDataStore
    {
        List<User> Users { get; }
        List<Project> Projects { get; }
        List<TaskItem> Tasks { get; }
    }
}
