using ProjectManagerAPI.DTOs;
using ProjectManagerAPI.Models;

namespace ProjectManagerAPI.Services
{
    public interface IAuthService
    {
        Task<User> Register(UserRegisterDto userRegisterDto);
        Task<string> Login(UserLoginDto userLoginDto);
        string GenerateJwtToken(User user);
        string HashPassword(string password);
        bool VerifyPassword(string enteredPassword, string storedHash);
    }
}
