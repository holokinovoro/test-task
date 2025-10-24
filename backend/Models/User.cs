namespace KicbTest.Models;

public class User
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public List<Phone> Phones { get; set; } = new(); // у пользователя может быть несколько номеров телефонов
    public DateOnly DateOfBirth { get; set; }
}