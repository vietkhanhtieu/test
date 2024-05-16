using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using KLTN.Services.CustomerServices.BusinessServices;
using KLTN.Services.ProductServices.BusinessServices;
using Microsoft.AspNetCore.Mvc;

namespace KLTN.Controllers.ProductController
{
    [Route("api/")]

    public class ProductController : Controller
    {
        private readonly ProductServices _productServices;
        public ProductController(ProductServices ProductServices)
        {
            _productServices = ProductServices;
        }


        [HttpGet]
        [Route("products/{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            try
            {
                var Product = await _productServices.FindByIdWithIncludeAsync(id);
                if (Product == null) return NotFound();

                return Ok(Product);
            }
            catch
            {
                return Problem();
            }
        }

        [HttpGet]
        [Route("products/get-all")]
        public async Task<ActionResult<Product>> GetAll()
        {
            try
            {
                var Product = await _productServices.GetAllAsync();
                if (Product == null) return NotFound();

                return Ok(Product);
            }
            catch
            {
                return Problem();
            }
        }


        [HttpPost]
        [Route("products/create")]
        public async Task<ActionResult<Product>> Create([FromBody] ProductRequestDto ProductRequestDto)
        {
            try
            {
                var Product = await _productServices.CreateAsync(ProductRequestDto);
                return Ok(Product);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPost]
        [Route("products/sync-product")]
        public async Task<ActionResult<Product>> CreateOrupdate([FromBody] List<ProductRequestDto> productRequestDtos)
        {
            try
            {
                var product = await _productServices.AddOrUpdateRange(productRequestDtos);
                return Ok(product);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }


        [HttpPut]
        [Route("products/update-product-infor/{id}")]
        public async Task<ActionResult<Product>> Update([FromRoute] int id, [FromBody] ProductRequestDto ProductRequestDto)
        {
            try
            {
                if (id != ProductRequestDto.Productid)
                    return BadRequest($"Can't find Product: {ProductRequestDto.Productid}");
                var Product = await _productServices.UpdateAsync(id, ProductRequestDto);
                return Ok(Product);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpDelete]
        [Route("products/{id}")]
        public async Task<ActionResult<Product>> Delete(int id)
        {
            try
            {
                await _productServices.DeleteAsync(id);
                return NoContent();
            }
            catch (ArgumentException argumentException)
            {
                return NotFound(argumentException.Message);
            }
            catch
            {
                return Problem();
            }
        }
    }
}
