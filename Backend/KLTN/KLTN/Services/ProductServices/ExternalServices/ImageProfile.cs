using AutoMapper;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;

namespace KLTN.Services.ProductServices.ExternalServices
{
    public class ImageProfile : Profile
    {
        public ImageProfile()
        {
            CreateMap<ImageRequestDto, Image>();
            CreateMap<Image, ImageResponseDto>();
        }
    }
}
