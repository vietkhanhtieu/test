using AutoMapper;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;

namespace KLTN.Services.OrderServices.ExternalServices
{
    public class OrderDetailProfile : Profile
    {
        public OrderDetailProfile()
        {
            CreateMap<OrderDetailRequestDto, Orderdetail>();
            CreateMap<Orderdetail, OrderResponseDto>();
        }
    }
}
