using AutoMapper;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;

namespace KLTN.Services.ProductServices.ExternalServices
{
    public class SaleUnitProfile : Profile
    {
        public SaleUnitProfile()
        {
            CreateMap<SaleUnitRequestDto, Saleunit>();
            CreateMap<Saleunit, SaleUnitResponseDto>();
        }
    }
}
