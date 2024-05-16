using AutoMapper;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;

namespace KLTN.Services.OrderServices.ExternalServices
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<OrderRequestDto, Order>();
            CreateMap<Order, OrderResponseDto>();
        }
    }
}
