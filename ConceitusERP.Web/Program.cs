using ConceitusERP.Data.Repositories;
using ConceitusERP.Domain.Servicos;
using ConceitusERP.Web.Token;
using ConceitusERP.Data.Configuration;
using ConceitusERP.Data.Repositories.Generics;
using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.Generics;
using ConceitusERP.Domain.Interfaces.ICategoria;
using ConceitusERP.Domain.Interfaces.IDespesa;
using ConceitusERP.Domain.Interfaces.InterfaceServicos;
using ConceitusERP.Domain.Interfaces.ISistemaFinanceiro;
using ConceitusERP.Domain.Interfaces.IUsuarioSistemaFinanceiro;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ContextBase>( options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDefaultIdentity<ApplicationUser>( options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ContextBase>();

//Interface and Repository
builder.Services.AddSingleton(typeof(InterfaceGenerica<>), typeof(RepositorioGenerico<>));
builder.Services.AddSingleton<InterfaceCategoria, RepositorioCategoria>();
builder.Services.AddSingleton<InterfaceDespesa, RepositorioDespesa>();
builder.Services.AddSingleton<InterfaceSistemaFinanceiro, RepositorioSistemaFinanceiro>();
builder.Services.AddSingleton<InterfaceUsuarioSistemaFinanceiro, RepositorioUsuarioSistemaFinanceiro>();

//Interface and Service
builder.Services.AddSingleton<ICategoriaServico, CategoriaServico>();
builder.Services.AddSingleton<IDespesaServico, DespesaServico>();
builder.Services.AddSingleton<ISistemaFinanceiroServico, SistemaFinanceiroServico>();
builder.Services.AddSingleton<IUsuarioSistemaFinanceiroServico, UsuarioSistemaFinanceiroServico>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(option =>
            {
                option.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = "Teste.Security.Bearer",
                    ValidAudience = "Teste.Security.Bearer",
                    IssuerSigningKey = JwtSecurityKey.Create("ConceitusERPCarlosGleison1978Cgco_#09a")
                };

                option.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine("OnAuthenticationFailed: " + context.Exception.Message);
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        Console.WriteLine("OnTokenValidated: " + context.SecurityToken);
                        return Task.CompletedTask;
                    }
                };
            });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
