using Demande_API.Models;
using Demande_API.Repositories;
using Demande_API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



// Changez "DefaultConnection" pour "Default" qui correspond à votre appsettings.json
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))); // ? "Default" au lieu de "DefaultConnection"

builder.Services.AddScoped<IDemandeRepository, DemandeRepository>();
builder.Services.AddScoped<IDemandeService, DemandeService>();

// Configuration CORS - Autorise votre app React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000", "http://localhost:5173") // Ports React typiques
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Utilise CORS - IMPORTANT: Placez-le au bon endroit
app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization(); // Note: Si vous utilisez l'authentification, UseAuthentication() doit venir avant
app.MapControllers();

app.Run();




