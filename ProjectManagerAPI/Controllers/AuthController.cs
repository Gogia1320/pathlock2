using Microsoft.AspNetCore.Mvc;
using ProjectManagerAPI.DTOs;
using ProjectManagerAPI.Services;

namespace ProjectManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
        {
            try
            {
                var user = await _authService.Register(userRegisterDto);
                return Ok(new { Message = "Registration successful", UserId = user.Id, Username = user.Username });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            var token = await _authService.Login(userLoginDto);
            if (token == null)
            {
                return Unauthorized(new { Message = "Invalid credentials." });
            }
            return Ok(new { Token = token });
        }
    }
}
