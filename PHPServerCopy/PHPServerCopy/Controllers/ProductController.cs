using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PHPServerCopy.Data;
using PHPServerCopy.Data.Entities;
using PHPServerCopy.Models;

namespace PHPServerCopy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private EFContext _context { get; set; }
        public ProductController(EFContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetPage([FromQuery] GetPageModelIndex model) 
        {
            int count = 3;
            int skipped = model.Page != 0 ? (model.Page-1)*count : 0;
            if(int.TryParse(model.Search, out int a)) 
            {
                int price = int.Parse(model.Search);
                var products= _context.Products.Where(x => x.Price >= price - 100 && x.Price <= price + 100)
                    .ToList();


                return Ok(new
                {
                    data = new
                    {
                        data = products.Select(x => x).Skip(skipped)
                .Take(count).ToList(),
                        current_page = model.Page,
                        last_page = (Math.Ceiling((decimal)products.Count() / count)),
                        total = products.Count(),
                        per_page = count
                    },
                    search = model.Search
                });

            }

            string search = model.Search != null ? model.Search : "";

            var returnProducts = _context.Products.Where(x =>
         x.Name.Contains(search) ||
         x.Description.Contains(search));
            return Ok(new
            {
                data = new
                {
                    data = returnProducts.Select(x => x).Skip(skipped)
                .Take(count).ToList(),
                current_page = model.Page,
                last_page = (Math.Ceiling((decimal)returnProducts.Count() / count)),
                total= returnProducts.Count(),
                per_page=count
                },
                search = model.Search
            });
        }

        [HttpPost]
        [Route("add")]
        public IActionResult AddItem([FromQuery] AddProductModel model) 
        {
            AppProduct product = _context.Products.Add(new Data.Entities.AppProduct { 
                Name = model.Name,
                Description = model.Description,
                Price = model.Price
            }).Entity;

            _context.SaveChanges();
            
            return Ok(new
            {
                success = true,
                message = "add item success",
                data = product
            });
        }
    }
}
