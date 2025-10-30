using System;
using System.Collections.Generic;

namespace ProjectManagerAPI.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public List<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
