using AutoMapper;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;

namespace KLTN.Services.OrderServices.ExternalServices
{
    public class ShippingMethodProfile : Profile
    {
        public ShippingMethodProfile()
        {
            CreateMap<ShippingMethodRequestDto, Shippingmethod>();
            CreateMap<Shippingmethod, ShippingMethodResponseDto>();
        }
    }
}
