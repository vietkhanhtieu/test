using AutoMapper;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;

namespace KLTN.Services.ProductServices.ExternalServices
{
    public class BussinessProfile : Profile
    {
        public BussinessProfile()
        {
            CreateMap<BussinessProductRequestDto, Bussinessproduct>();
            CreateMap<Bussinessproduct, BussinessResponseDto>();
        }
    }
}
