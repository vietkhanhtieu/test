using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;
using KLTN.Models.Products;
using KLTN.Services.CustomerServices.BusinessServices;
using KLTN.Services.OrderServices.BusinessServices;
using Microsoft.AspNetCore.Mvc;

namespace KLTN.Controllers.OrderController
{
    [Route("api/")]

    public class OrderController : Controller
    {
        private readonly OrderServices _orderServices;
        public OrderController(OrderServices orrOrderServices)
        {
            _orderServices = orrOrderServices;
        }

        [HttpGet]
        [Route("order")]
        public async Task<ActionResult<Order>> GetAll()
        {
            try
            {
                var order = await _orderServices.GetAllAsync();
                if (order == null) return NotFound();

                return Ok(order);
            }
            catch
            {
                return Problem();
            }
        }


        [HttpGet]
        [Route("order/{id}")]
        public async Task<ActionResult<Order>> Get(int id)
        {
            try
            {
                var order = await _orderServices.FindByIdWithIncludeAsync(id);
                if (order == null) return NotFound();

                return Ok(order);
            }
            catch
            {
                return Problem();
            }
        }


        [HttpGet]
        [Route("order/get-all-order-by-userid/{id}")]
        public async Task<ActionResult<Order>> GetByUserId(int id)
        {
            try
            {
                var order = await _orderServices.FindByIdUserInclueAsync(id);
                if (order == null) return NotFound();

                return Ok(order);
            }
            catch
            {
                return Problem();
            }
        }

        [HttpPost]
        [Route("order/create")]
        public async Task<ActionResult<Order>> Create([FromBody] OrderRequestDto orderRequestDto)
        {
            try
            {
                var order = await _orderServices.CreateAsync(orderRequestDto);
                return Ok(order);
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
        [Route("order/delete/{id}")]
        public async Task<ActionResult<Order>> Delete(int id)
        {
            try
            {
                await _orderServices.DeleteAsync(id);
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

        [HttpPut]
        [Route("order/update/{id}")]
        public async Task<ActionResult<Order>> Update([FromRoute] int id, [FromBody] OrderRequestDto orderRequestDto)
        {
            try
            {
                if (id != orderRequestDto.Orderid)
                    return BadRequest($"Can't find order: {orderRequestDto.Orderid}");
                var order = await _orderServices.UpdateAsync(id, orderRequestDto);
                return Ok(order);
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
    }
}
