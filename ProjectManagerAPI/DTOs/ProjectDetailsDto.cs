using System;
using System.Collections.Generic;

namespace ProjectManagerAPI.DTOs
{
    public class ProjectDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<TaskItemDto> Tasks { get; set; }
    }
}
