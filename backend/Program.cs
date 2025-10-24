using KicbTest.DataAccess;
using KicbTest.Dto;
using KicbTest.Interfaces;
using KicbTest.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddOpenApi();

var services = builder.Services;

// выгрузка настроек через env variables
var appSettings = new AppSettings()
{
    ConnectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING") ?? ""
};

services.Configure<AppSettings>(options =>
{
    options.ConnectionString = appSettings.ConnectionString;
});

services.AddDbContext<KicbTestDb>(options =>
{
    options.UseNpgsql(appSettings.ConnectionString);
});

services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.AddScoped<KicbTestDb>();
services.AddScoped<IUser, UserService>();
services.AddScoped<IPhone, PhoneService>();

var app = builder.Build();

using var scope = app.Services.CreateAsyncScope();

var db = scope.ServiceProvider.GetRequiredService<KicbTestDb>();
db.Database.Migrate();

app.UseCors(x => x
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();
app.Run();

