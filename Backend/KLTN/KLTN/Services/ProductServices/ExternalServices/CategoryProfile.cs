using AutoMapper;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;

namespace KLTN.Services.ProductServices.ExternalServices
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<CategoriesRequestDto, Category>();
            CreateMap<Category, CategoriesResponseDto>();
        }
    }
}
