namespace KicbTest.Models;

public class Phone
{
    public int Id { get; set; }
    public required string PhoneNumber { get; set; }
    public int UserId { get; set; } // у номера телефона есть внешний ключ на пользователя
    public User User { get; set; } = null!;
}