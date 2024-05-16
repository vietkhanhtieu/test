using AutoMapper;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;

namespace KLTN.Services.OrderServices.ExternalServices
{
    public class OrderStatusProfile : Profile
    {
        public OrderStatusProfile()
        {
            CreateMap<OrderStatusRequestDto, Orderstatus>();
            CreateMap<Orderstatus, OrderStatusResponseDto>();
        }
    }
}
