using KicbTest.Models;

namespace KicbTest.Interfaces;

public interface IPhone
{
    Task<Phone?> GetByIdAsync(int id);
    Task<List<Phone>> GetAllAsync();
    Task<Phone> CreateAsync(Phone phone);
    Task<Phone?> UpdateAsync(int id, Phone phone);
    Task<bool> DeleteAsync(int id);
}