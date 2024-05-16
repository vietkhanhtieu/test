using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;
using KLTN.Services.OrderServices.BusinessServices;
using Microsoft.AspNetCore.Mvc;

namespace KLTN.Controllers.OrderController
{
    [Route("api/shipping-method")]

    public class ShippingMethodController : BaseController<ShippingMethodRequestDto, ShippingMethodResponseDto, Shippingmethod>
    {
        public ShippingMethodController(ShippingMethodServices ShippingMethodServices) : base(ShippingMethodServices) { }
    }
}
