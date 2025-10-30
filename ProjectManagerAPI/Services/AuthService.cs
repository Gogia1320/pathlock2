using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProjectManagerAPI.Data;
using ProjectManagerAPI.DTOs;
using ProjectManagerAPI.Models;
using System.Security.Cryptography;

namespace ProjectManagerAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly IDataStore _dataStore;
        private readonly IConfiguration _configuration;

        public AuthService(IDataStore dataStore, IConfiguration configuration)
        {
            _dataStore = dataStore;
            _configuration = configuration;
        }

        public async Task<User> Register(UserRegisterDto userRegisterDto)
        {
            if (_dataStore.Users.Any(u => u.Username == userRegisterDto.Username))
            {
                throw new ArgumentException("Username already exists.");
            }

            var newUser = new User
            {
                Id = _dataStore.Users.Any() ? _dataStore.Users.Max(u => u.Id) + 1 : 1,
                Username = userRegisterDto.Username,
                PasswordHash = HashPassword(userRegisterDto.Password)
            };

            _dataStore.Users.Add(newUser);
            return newUser;
        }

        public async Task<string> Login(UserLoginDto userLoginDto)
        {
            var user = _dataStore.Users.FirstOrDefault(u => u.Username == userLoginDto.Username);
            if (user == null || !VerifyPassword(userLoginDto.Password, user.PasswordHash))
            {
                return null; // or throw an exception for invalid credentials
            }

            return GenerateJwtToken(user);
        }

        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        public bool VerifyPassword(string enteredPassword, string storedHash)
        {
            var hashedEnteredPassword = HashPassword(enteredPassword);
            return hashedEnteredPassword == storedHash;
        }
    }
}
