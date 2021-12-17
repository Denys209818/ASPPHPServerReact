using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PHPServerCopy.Data;
using PHPServerCopy.Services;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen((SwaggerGenOptions opts) => {
    opts.SwaggerDoc("v1", new OpenApiInfo
    {
        Description = "Swagger",
        Version = "v1",
        Title = "PHPServerCopy"
    });
});
builder.Services.AddDbContext<EFContext>((DbContextOptionsBuilder opts) =>
{
    opts.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();

if (app.Environment.IsDevelopment()) 
{
    app.SeedAll();
    app.UseSwagger();
    app.UseSwaggerUI((SwaggerUIOptions opts) => {
        opts.SwaggerEndpoint("/swagger/v1/swagger.json", "PHPServerCopy v1");
    });
}

app.UseRouting();

app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
});

app.Run();
