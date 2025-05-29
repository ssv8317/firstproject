using Models;
using Services;

var builder = WebApplication.CreateBuilder(args);

// MongoDB settings
builder.Services.Configure<CanteenDatabaseSettings>(
    builder.Configuration.GetSection("CanteenDatabaseSettings"));

// DI for services
builder.Services.AddSingleton<OrderService>();

// ✅ CORS for React frontend on port 5176
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5176")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ Enable CORS
app.UseCors("AllowFrontend");

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.Run();