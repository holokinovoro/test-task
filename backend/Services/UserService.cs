using KicbTest.DataAccess;
using KicbTest.Interfaces;
using KicbTest.Models;
using Microsoft.EntityFrameworkCore;

namespace KicbTest.Services;

public class UserService : IUser
{
    private readonly KicbTestDb _context;

    public UserService(KicbTestDb context)
    {
        _context = context;
    }

    public async Task<User> CreateAsync(User user)
    {
        try
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                throw new Exception("User with the same email already exists");
            }
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        catch (Exception ex)
        {
            throw new Exception("Error creating user", ex);
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            throw new Exception("Error deleting user", ex);
        }
    }

    public async Task<List<User>> GetAllAsync()
    {
        try
        {
            return await _context.Users.ToListAsync();
        }
        catch (Exception ex)
        {
            throw new Exception("Error retrieving users", ex);
        }
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        try
        {
            var user = await _context.Users.FindAsync(id);
            return user;
        }
        catch (Exception ex)
        {
            throw new Exception("Error retrieving user by ID", ex);
        }
    }

    public async Task<User?> UpdateAsync(int id, User user)
    {
        try{
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return null;
            }

            existingUser.Name = user.Name;
            existingUser.Email = user.Email;
            existingUser.DateOfBirth = user.DateOfBirth;

            await _context.SaveChangesAsync();
            return existingUser;
        }
        catch (Exception ex)
        {
            throw new Exception("Error updating user", ex);
        }
    }
}