using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectManagerAPI.DTOs
{
    public class TaskItemDto
    {
        [Required]
        [StringLength(200, MinimumLength = 3)]
        public string Title { get; set; }

        public int Id { get; set; }
        public DateTime DueDate { get; set; }

        public bool IsCompleted { get; set; }
    }
}
