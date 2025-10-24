using KicbTest.Dto;
using KicbTest.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace KicbTest.DataAccess;

public class KicbTestDb : DbContext
{
    private readonly AppSettings _appSettings;

    public KicbTestDb(IOptions<AppSettings> appSettings)
    {
        _appSettings = appSettings.Value;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_appSettings.ConnectionString);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Phone> Phones { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).IsRequired();
            entity.Property(e => e.Email).IsRequired();
            entity.Property(e => e.DateOfBirth);
        });

        modelBuilder.Entity<Phone>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.PhoneNumber).IsRequired();
            entity.HasIndex(e => e.UserId);
            entity.HasOne(e => e.User)
                  .WithMany(e => e.Phones)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}