using KicbTest.DataAccess;
using KicbTest.Interfaces;
using KicbTest.Models;
using Microsoft.EntityFrameworkCore;

namespace KicbTest.Services;

public class PhoneService : IPhone
{
    private readonly KicbTestDb _context;

    public PhoneService(KicbTestDb context)
    {
        _context = context;
    }
    public async Task<Phone> CreateAsync(Phone phone)
    {
        try
        {
            var existingPhone = await _context.Phones.FirstOrDefaultAsync(p => p.PhoneNumber == phone.PhoneNumber);
            if (existingPhone != null)
            {
                throw new Exception("Phone with the same number already exists");
            }
            _context.Phones.Add(phone);
            await _context.SaveChangesAsync();
            return phone;
        }
        catch (Exception ex)
        {
            throw new Exception("Error creating phone", ex);
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var phone = await _context.Phones.FindAsync(id);
            if (phone == null)
            {
                return false;
            }

            _context.Phones.Remove(phone);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            throw new Exception("Error deleting phone", ex);
        }
    }

    public Task<List<Phone>> GetAllAsync()
    {
        try
        {
            return _context.Phones.ToListAsync();
        }
        catch (Exception ex)
        {
            throw new Exception("Error retrieving phones", ex);
        }
    }

    public async Task<Phone?> GetByIdAsync(int id)
    {
        try
        {
            var phone = await _context.Phones.FindAsync(id);
            return phone;
        }
        catch (Exception ex)
        {
            throw new Exception("Error retrieving phone", ex);
        }
    }

    public async Task<Phone?> UpdateAsync(int id, Phone phone)
    {
        try
        {
            var existingPhone = await _context.Phones.FindAsync(id);
            if (existingPhone == null)
            {
                return null;
            }

            existingPhone.PhoneNumber = phone.PhoneNumber ?? existingPhone.PhoneNumber;
            existingPhone.UserId = phone.UserId;

            await _context.SaveChangesAsync();
            return existingPhone;
        }
        catch (Exception ex)
        {
            throw new Exception("Error updating phone", ex);
        }
    }
}