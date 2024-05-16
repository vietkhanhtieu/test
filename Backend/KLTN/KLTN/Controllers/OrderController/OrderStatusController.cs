using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;
using KLTN.Services.CustomerServices.BusinessServices;
using KLTN.Services.OrderServices.BusinessServices;
using Microsoft.AspNetCore.Components;

namespace KLTN.Controllers.OrderController
{
    [Route("api/order-status")]

    public class OrderStatusController : BaseController<OrderStatusRequestDto, OrderStatusResponseDto, Orderstatus>
    {
        public OrderStatusController(OrderStatusServices services) : base(services)
        {

        }
    }
}
