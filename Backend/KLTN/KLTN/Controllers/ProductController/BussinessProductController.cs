using KLTN.Constaint;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using KLTN.Services.ProductServices.BusinessServices;
using Microsoft.AspNetCore.Mvc;

namespace KLTN.Controllers.ProductController
{
    [Route("api/")]

    public class BussinessProductController : Controller
    {
        private readonly BussinessProductServices _bussinessProductServices;
        public BussinessProductController(BussinessProductServices bussinessProductServices)
        {
            _bussinessProductServices = bussinessProductServices;
        }


        [HttpGet]
        [Route("bussiness-products/{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            try
            {
                var bussinessProduct = await _bussinessProductServices.FindByIdWithIncludeAsync(id);
                if (bussinessProduct == null) return NotFound();

                return Ok(bussinessProduct);
            }
            catch
            {
                return Problem();
            }
        }

        [HttpGet]
        [Route("bussiness-products/get-all")]
        public async Task<ActionResult<Product>> GetAll(
            int? top = CommonConstants.DEFAULT_TOP,
            int? skip = CommonConstants.DEFAULT_SKIP,
            string productName = "",
            string categori = "")
        {
            var filter = new FilterBussinessProduct();
            filter.ProductName = productName;
            filter.Category = categori;
            try
            {
                var product = await _bussinessProductServices.GetAllAsync((int)top,(int)skip, filter);
                if (product == null) return NotFound();

                return Ok(product);
            }
            catch
            {
                return Problem();
            }
        }


        [HttpPost]
        [Route("bussiness-products/create")]
        public async Task<ActionResult<Product>> Create([FromBody] BussinessProductRequestDto bussinessProductRequestDto)
        {
            try
            {
                var product = await _bussinessProductServices.CreateAsync(bussinessProductRequestDto);
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



        [HttpDelete]
        [Route("bussiness-products/{id}")]
        public async Task<ActionResult<Product>> Delete(int id)
        {
            try
            {
                await _bussinessProductServices.DeleteAsync(id);
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
