using KicbTest.Dto;
using KicbTest.Interfaces;
using KicbTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace KicbTest.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUser _userService;
    public UserController(IUser userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _userService.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpGet()]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllAsync();
        return Ok(users);
    }

    [HttpPost()]
    public async Task<IActionResult> CreateUser([FromBody]CreateUserDto createUserDto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        
        var user = new User
        {
            Name = createUserDto.Name,
            Email = createUserDto.Email,
            DateOfBirth = createUserDto.DateOfBirth
        };

        try
        {
            var createdUser = await _userService.CreateAsync(user);
            return Created($"/api/users/{createdUser.Id}", createdUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody]UpdateUserDto updateUserDto)
    {
        var user = new User
        {
            Name = updateUserDto.Name ?? string.Empty,
            Email = updateUserDto.Email ?? string.Empty,
            DateOfBirth = updateUserDto.DateOfBirth
        };
        try
        {
            var updatedUser = await _userService.UpdateAsync(id, user);
            if (updatedUser == null)
            {
                return NotFound();
            }
            return Ok(updatedUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            var result = await _userService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}