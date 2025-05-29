using Models;
using Services;

var builder = WebApplication.CreateBuilder(args);

// MongoDB settings
builder.Services.Configure<CanteenDatabaseSettings>(
    builder.Configuration.GetSection("CanteenDatabaseSettings"));

// DI for services
builder.Services.AddSingleton<OrderService>();

// CORS for React frontend - Updated to handle both HTTP and HTTPS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://localhost:5173",
                "http://127.0.0.1:5173",
                "https://127.0.0.1:5173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithExposedHeaders("*");
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable CORS - Move before other middleware
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.Run();