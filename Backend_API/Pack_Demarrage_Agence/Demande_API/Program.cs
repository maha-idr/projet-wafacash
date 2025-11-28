using Demande_API.Data;
using Demande_API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
            )
        };
    });

builder.Services.AddAuthorization();

// Connection à ta base de données
builder.Services.AddDbContext<WafacashDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Injection du service
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

//// ✅ Ajout de CORS
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowReactApp",
//        policy => policy.WithOrigins("http://localhost:3000")
//                        .AllowAnyHeader()
//                        .AllowAnyMethod());
//});






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


//app.UseAuthorization();


