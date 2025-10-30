using System.ComponentModel.DataAnnotations;

namespace ProjectManagerAPI.DTOs
{
    public class ProjectDto
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; }

        [StringLength(100)]
        public string Description { get; set; }
    }
}
