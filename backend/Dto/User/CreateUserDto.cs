using System.ComponentModel.DataAnnotations;

namespace KicbTest.Dto;

public class CreateUserDto
{
    public required string Name { get; set; }
    [EmailAddress]
    public required string Email { get; set; }
    public DateOnly DateOfBirth { get; set; }
}