using ProjectManagerAPI.Models;
using System.Collections.Generic;

namespace ProjectManagerAPI.Data
{
    public class DataStore : IDataStore
    {
        public List<User> Users { get; private set; } = new List<User>();
        public List<Project> Projects { get; private set; } = new List<Project>();
        public List<TaskItem> Tasks { get; private set; } = new List<TaskItem>();

        public DataStore()
        {
            // Seed some initial data if needed for testing
        }
    }
}
