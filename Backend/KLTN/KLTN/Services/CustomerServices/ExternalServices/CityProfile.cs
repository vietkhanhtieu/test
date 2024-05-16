using AutoMapper;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;

namespace KLTN.Services.CustomerServices.ExternalServices
{
    public class CityProfile : Profile
    {
        public CityProfile()
        {
            CreateMap<City, CityResponseDto>();
            CreateMap<CityRequestDto, City>();
        }
    }
}
