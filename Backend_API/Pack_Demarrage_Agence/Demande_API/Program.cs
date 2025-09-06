using Demande_API.Data;
using Demande_API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Connection à ta base de données
builder.Services.AddDbContext<WafacashDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Injection du service
builder.Services.AddScoped<IDemandeRepository, DemandeRepository>();

builder.Services.AddScoped<IDemandeService, DemandeService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Ajout de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});






var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseCors("AllowReactApp");

app.UseAuthentication(); // ✅ Ajoute l'authentification
app.UseAuthorization();  // ✅ Ajoute l'autorisation

app.MapControllers();

app.Run();
