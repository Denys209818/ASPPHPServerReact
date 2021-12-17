using PHPServerCopy.Data;

namespace PHPServerCopy.Services
{
    public static class DbSeeder
    {
        public static void SeedAll(this IApplicationBuilder builder) 
        {
            using (var scope = builder.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<EFContext>();
                if (!_context.Products.Any())
                {
                    _context.Products.Add(new Data.Entities.AppProduct
                    {
                        Name = "BMW X3",
                        Description = "BMW X3 AUTO",
                        Price = 120
                    });
                    _context.Products.Add(new Data.Entities.AppProduct
                    {
                        Name = "BMW X5",
                        Description = "BMW X5 AUTO",
                        Price = 145
                    });
                    _context.Products.Add(new Data.Entities.AppProduct
                    {
                        Name = "BMW X6",
                        Description = "BMW X3 AUTO",
                        Price = 112
                    });
                    _context.Products.Add(new Data.Entities.AppProduct
                    {
                        Name = "BMW X7",
                        Description = "BMW X3 AUTO",
                        Price = 150
                    });
                    _context.Products.Add(new Data.Entities.AppProduct
                    {
                        Name = "Toyota",
                        Description = "Toyota Land Cruiser AUTO",
                        Price = 600
                    });

                    _context.SaveChanges();
                }
            }
        }
    }
}
