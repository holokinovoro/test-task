namespace KicbTest.Dto;

public class UpdateUserDto
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public DateOnly DateOfBirth { get; set; }
}