using AutoMapper;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;

namespace KLTN.Services.ProductServices.ExternalServices
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<ProductRequestDto, Product>();
            CreateMap<Product, ProductResponseDto>();
        }
    }
}
