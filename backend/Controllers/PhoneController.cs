using KicbTest.Dto;
using KicbTest.Interfaces;
using KicbTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace KicbTest.Controllers;

[ApiController]
[Route("api/phones")]
public class PhoneController : ControllerBase
{
    private readonly IPhone _phoneService;
    public PhoneController(IPhone phoneService)
    {
        _phoneService = phoneService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPhoneById(int id)
    {
        var phone = await _phoneService.GetByIdAsync(id);
        if (phone == null)
        {
            return NotFound();
        }
        return Ok(phone);
    }

    [HttpGet()]
    public async Task<IActionResult> GetAllPhones()
    {
        var phones = await _phoneService.GetAllAsync();
        return Ok(phones);
    }

    [HttpPost()]
    public async Task<IActionResult> CreatePhone([FromBody]CreatePhoneDto createPhoneDto)
    {
        try
        {
            var phone = new Phone
            {
                PhoneNumber = createPhoneDto.PhoneNumber,
                UserId = createPhoneDto.UserId
            };

            var createdPhone = await _phoneService.CreateAsync(phone);
            return Ok(createdPhone);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePhone(int id, [FromBody]UpdatePhoneDto updatePhoneDto)
    {
        try
        {
            var phone = new Phone
            {
                PhoneNumber = updatePhoneDto.PhoneNumber ?? string.Empty,
                UserId = updatePhoneDto.UserId
            };

            var updatedPhone = await _phoneService.UpdateAsync(id, phone);
            if (updatedPhone == null)
            {
                return NotFound();
            }
            return Ok(updatedPhone);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePhone(int id)
    {
        try
        {
            var deleted = await _phoneService.DeleteAsync(id);
            if (!deleted)
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